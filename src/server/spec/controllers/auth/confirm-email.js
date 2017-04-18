/**
 * confirm-email
 * get-native.com
 *
 * Created by henryehly on 2017/04/18.
 */

const SpecUtil = require('../../spec-util');
const Auth     = require('../../../app/helpers').Auth;

const Promise  = require('bluebird');
const request  = require('supertest');
const assert   = require('assert');
const moment   = require('moment');

describe('POST /confirm_email', function() {
    let server  = null;
    let db      = null;

    before(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAll(), SpecUtil.startMailServer()]);
    });

    beforeEach(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return SpecUtil.startServer().then(function(initGroup) {
            server = initGroup.server;
            db     = initGroup.db;
        });
    });

    afterEach(function(done) {
        server.close(done);
    });

    after(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAllUndo(), SpecUtil.stopMailServer()]);
    });

    describe('response.failure', function() {
        it(`should respond with 400 Bad Request if the 'token' query parameter is missing`, function(done) {
            request(server).post('/confirm_email').expect(400, done);
        });

        it(`should respond with 400 Bad Request if the 'token' query parameter is less than 32 characters in length`, function(done) {
            request(server).post('/confirm_email?token=less_than_32_characters').expect(400, done);
        });

        it(`should respond with 400 Bad Request if the 'token' query parameter is more than 32 characters in length`, function(done) {
            request(server).post('/confirm_email?token=more_than_32_characters_more_than_32_characters').expect(400, done);
        });

        it(`should respond with 404 Not Found if the verification token does not exist`, function(done) {
            request(server).post('/confirm_email?token=bf294bed1332e34f9faf00413d0e61ab').expect(404, done);
        });

        it(`should respond with 404 Not Found if the verification token is expired`, function(done) {
            db.Account.findOne().then(function(account) {
                return db.VerificationToken.create({
                    account_id: account.id,
                    token: Auth.generateVerificationToken(),
                    expiration_date: moment().subtract(1, 'days').toDate()
                });
            }).then(function(token) {
                request(server).post(`/confirm_email?token=${token.get('token')}`).expect(404, done);
            });
        });
    });

    describe('response.success', function() {
        it(`should respond with 204 No Content if the verification succeeds`, function(done) {
            db.Account.create({
                email: 'foo@bar.com',
                password: Auth.hashPassword('12345678')
            }).then(function(account) {
                return db.VerificationToken.create({
                    account_id: account.id,
                    token: Auth.generateVerificationToken(),
                    expiration_date: moment().add(1, 'days').toDate()
                });
            }).then(function(token) {
                request(server).post(`/confirm_email?token=${token.get('token')}`).expect(204, done);
            });
        });
    });

    describe('other', function() {
        it(`should change the account email_verified value to true if verification succeeds`, function() {
            let accountId = null;
            return db.Account.create({
                email: 'bar@foo.com',
                password: Auth.hashPassword('12345678')
            }).then(function(account) {
                accountId = account.id;
                return db.VerificationToken.create({
                    account_id: account.id,
                    token: Auth.generateVerificationToken(),
                    expiration_date: moment().add(1, 'days').toDate()
                });
            }).then(function(token) {
                return request(server).post(`/confirm_email?token=${token.get('token')}`);
            }).then(function() {
                return db.Account.findById(accountId);
            }).then(function(account) {
                assert.equal(account.get('email_verified'), true);
            });
        });
    });
});

/*
 * When the user clicks the link, it opens the new route 'confirm email'
 * Finds the account activation record
 * Checks the expiry date
 * Changes the user email verified to true
 * Redirects user to /dashboard
 * */

/*
 * Create an account - auth controller
 * Create the code for the activation record - auth helper
 * Create an account activation record - auth controller
 * Generate a confirmation URL - auth helper
 * Send email - auth controller
 *
 * click activation code - new route controller
 * verify account activation code - new route controller
 * log the user in - new route controller
 * */

/*
* todo: give the user the opportunity to get a new token once it has expired
* - have the user enter their email address and IF they have an unverified account, a new confirmation email will be sent
* todo: cron job to delete expired verification tokens
* the error page should contain a 'resend confirmation link' option
* todo: (client) have a resend confirmation link in the settings page (need a resend_confirmation_link endpoint)
* */