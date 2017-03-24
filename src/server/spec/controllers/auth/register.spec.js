/**
 * register.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/24.
 */

const SpecUtil = require('../../spec-util');
const Utility  = require('../../../app/helpers').Utility;
const request  = require('supertest');
const assert   = require('assert');

describe('POST /login', function() {
    let server = null;

    // todo
    const newAccountCredentials = {
        email: 'test@email.com',
        password: 'test_password'
    };

    before(function(done) {
        this.timeout(SpecUtil.defaultTimeout);
        SpecUtil.seedAll(done);
    });

    beforeEach(function(done) {
        this.timeout(SpecUtil.defaultTimeout);
        delete require.cache[require.resolve('../../../index')];
        require('../../../index').then(function(_) {
            server = _;
            done();
        });
    });

    afterEach(function(done) {
        server.close(done);
    });

    after(function(done) {
        this.timeout(SpecUtil.defaultTimeout);
        SpecUtil.seedAllUndo(done);
    });

    describe('headers', function() {
        it('should respond with an X-GN-Auth-Token header', function() {
            request(server).post('/register').send(newAccountCredentials).then(function(response) {
                assert(response.header['x-gn-auth-token'].length > 0);
            });
        });

        it('should respond with an X-GN-Auth-Expire header containing a valid timestamp value', function() {
            request(server).post('/register').send(newAccountCredentials).then(function(response) {
                assert(SpecUtil.isParsableDateValue(+response.header['x-gn-auth-expire']));
            });
        });
    });

    // todo: You don't want to allow someone to make 10,000 accounts via the commandline (check user agent?)
    // todo: Should User-Agents like 'curl' be allowed to use the API at all?

    // todo: email account for test use? Remember: you don't want to have to do a bunch of setup..
    // todo: you don't want to receive 20 emails every time you run these specs..
    it(`should send an 'email-confirmation' email after successful registration`);

    it('should respond with 200 OK for a successful request', function(done) {
        request(server).post('/register').send(newAccountCredentials).expect(200, done);
    });

    it(`should respond with a 422 Unprocessable Entity response the 'email' field is missing`, function(done) {
        request(server).post('/register').send({password: newAccountCredentials.password}).expect(422, done);
    });

    it(`should respond with 422 Unprocessable Entity if the 'email' field is not an email`, function(done) {
        request(server).post('/register').send({password: newAccountCredentials.password, email: 'not_an_email'}).expect(422, done);
    });

    it(`should respond with a 422 Unprocessable Entity response the 'password' field is missing`, function(done) {
        request(server).post('/register').send({email: newAccountCredentials.email}).expect(422, done);
    });

    it(`should respond with a 422 Unprocessable Entity response the 'password' is less than 8 characters`, function(done) {
        request(server).post('/register').send({email: newAccountCredentials.email, password: 'lt8char'}).expect(422, done);
    });

    it(`should respond with an object containing the user's ID`, function() {
        return request(server).post('/register').send(newAccountCredentials).then(function(response) {
            assert(SpecUtil.isNumber(response.body.id));
        });
    });

    it(`should respond with an object containing the user's email address`, function() {
        return request(server).post('/register').send(newAccountCredentials).then(function(response) {
            assert(SpecUtil.isValidEmail(response.body.email));
        });
    });

    it(`should respond with an object containing the user's preference for receiving browser notifications`, function() {
        return request(server).post('/register').send(newAccountCredentials).then(function(response) {
            assert.equal(Utility.typeof(response.body.browser_notifications_enabled), 'boolean');
        });
    });

    it(`should respond with an object containing the user's preference for receiving email notifications`, function() {
        return request(server).post('/register').send(newAccountCredentials).then(function(response) {
            assert.equal(Utility.typeof(response.body.email_notifications_enabled), 'boolean');
        });
    });

    it(`should respond with an object containing the user's email validity status`, function() {
        return request(server).post('/register').send(newAccountCredentials).then(function(response) {
            assert.equal(Utility.typeof(response.body.email_notifications_enabled), 'boolean');
        });
    });

    it(`should respond with an object containing the user's default study language code`, function() {
        return request(server).post('/register').send(newAccountCredentials).then(function(response) {
            assert(new RegExp(/[a-z]+/).text(response.body.default_study_language_code));
        });
    });

    // todo: and if they don't have one?
    it(`should respond with an object containing the user's profile picture URL`);
    it(`should respond with an object containing the user's preference for using the profile picture or silhouette image`);

    it(`should create a new user whose email is the same as specified in the request`);
    it(`should store the new users' password in an encrypted format that is not equal to the request`);
});
