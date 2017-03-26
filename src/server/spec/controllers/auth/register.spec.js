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
const MailDev  = require('maildev');
const Promise  = require('bluebird');
const nconf    = require('nconf');
const db       = require('../../../app/models');
const k        = require('../../../config/keys.json');

// todo: You don't want to allow someone to make 10,000 accounts via the commandline (check user agent?)
// todo: Should User-Agents like 'curl' be allowed to use the API at all?
describe('POST /register', function() {
    let server  = null;

    const newAccountCredentials = {
        email: 'new.user@email.com',
        password: 'test_password'
    };

    before(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAll(), SpecUtil.startMailServer()]);
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
        db.Account.findOne({where: {email: newAccountCredentials.email}}).then(function(account) {
            if (!account) {
                return server.close(done);
            }

            db.StudySession.findAll({where: {account_id: account.id}, attributes: ['id']}).then(studySessions => {
                db.WritingAnswer.destroy({where: {study_session_id: {$in: studySessions.map(x => x.id)}}}).then(() => {
                    Promise.all([
                        db.Follower.destroy({where: {account_id: account.id}}),
                        db.Like.destroy({where: {account_id: account.id}}),
                        db.CuedVideo.destroy({where: {account_id: account.id}}),
                        db.Notification.destroy({where: {account_id: account.id}}),
                        db.StudySession.destroy({where: {account_id: account.id}})
                    ]).then(function() {
                        db.Account.destroy({where: {email: newAccountCredentials.email}}).then(function() {
                            server.close(done);
                        });
                    });
                });
            });
        });
    });

    after(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAllUndo(), SpecUtil.stopMailServer()]);
    });

    describe('headers', function() {
        it('should respond with an X-GN-Auth-Token header', function() {
            return request(server).post('/register').send(newAccountCredentials).then(function(response) {
                assert(response.header['x-gn-auth-token'].length > 0);
            });
        });

        it('should respond with an X-GN-Auth-Expire header containing a valid timestamp value', function() {
            return request(server).post('/register').send(newAccountCredentials).then(function(response) {
                assert(SpecUtil.isParsableDateValue(+response.header['x-gn-auth-expire']));
            });
        });
    });

    describe('confirmation email', function() {
        it(`should send a confirmation email to the newly registered user after successful registration`, function(done) {
            request(server).post('/register').send(newAccountCredentials).then(function() {
                SpecUtil.getAllEmail(function(error, emails) {
                    const recipientEmailAddress = emails[0].envelope.to[0].address;
                    assert.equal(recipientEmailAddress, newAccountCredentials.email);
                    done();
                });
            });
        });

        it(`should send a confirmation email from the get-native noreply account after successful registration`, function(done) {
            request(server).post('/register').send(newAccountCredentials).then(function() {
                SpecUtil.getAllEmail(function(error, emails) {
                    const senderEmailAddress = emails[0].envelope.from.address;
                    const noreplyEmailAddress = nconf.get(k.NoReply);
                    assert.equal(senderEmailAddress, noreplyEmailAddress);
                    done();
                });
            });
        });
    });

    describe('request', function() {
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

        it(`should send a 422 Unprocessable Entity response if the registration email is already in use`, function(done) {
            request(server).post('/register').send(newAccountCredentials).then(function() {
                request(server).post('/register').send(newAccountCredentials).expect(422, done);
            });
        });
    });

    describe('response.body', function() {
        it(`should respond with an object containing the user's ID`, function() {
            return request(server).post('/register').send(newAccountCredentials).then(function(response) {
                assert(SpecUtil.isNumber(response.body.id));
            });
        });

        it(`should create a new user whose email is the same as specified in the request`, function() {
            return request(server).post('/register').send(newAccountCredentials).then(function(response) {
                assert.equal(response.body.email, newAccountCredentials.email);
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
                assert(new RegExp(/[a-z]+/).test(response.body.default_study_language_code));
            });
        });

        it(`should respond with an object containing the user's blank profile picture URL`, function() {
            return request(server).post('/register').send(newAccountCredentials).then(function(response) {
                assert.equal(response.body.picture_url, '');
            });
        });

        it(`should respond with the user's profile picture preference set to silhouette image`, function() {
            return request(server).post('/register').send(newAccountCredentials).then(function(response) {
                assert.equal(response.body.is_silhouette_picture, true);
            });
        });
    });

    it(`should store the new users' password in an encrypted format that is not equal to the request`, function() {
        return request(server).post('/register').send(newAccountCredentials).then(function(response) {
            return db.Account.findOne({where: {email: newAccountCredentials.email}}).then(function(account) {
                assert.notEqual(account.password, newAccountCredentials.password);
            });
        });
    });
});
