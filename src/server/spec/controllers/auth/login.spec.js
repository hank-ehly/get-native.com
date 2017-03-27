/**
 * login.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/08.
 */

const SpecUtil = require('../../spec-util');
const Utility  = require('../../../app/helpers').Utility;
const request  = require('supertest');
const assert   = require('assert');
const url      = require('url');
const Promise  = require('bluebird');

describe('POST /login', function() {
    let server        = null;
    const credentials = {email: 'test@email.com', password: 'test_password'};

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
        server.close(done);
    });

    after(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAllUndo(), SpecUtil.stopMailServer()]);
    });

    describe('headers', function() {
        it('should respond with an X-GN-Auth-Token header', function() {
            return request(server).post('/login').send(credentials).then(function(response) {
                assert(response.header['x-gn-auth-token'].length > 0);
            });
        });

        it('should respond with an X-GN-Auth-Expire header containing a valid timestamp value', function() {
            return request(server).post('/login').send(credentials).then(function(response) {
                assert(SpecUtil.isParsableDateValue(+response.header['x-gn-auth-expire']));
            });
        });
    });

    it('should respond with 200 OK', function(done) {
        request(server).post('/login').send(credentials).expect(200, done);
    });

    it('should respond with a 422 Unprocessable Entity response if the user is not found', function(done) {
        request(server).post('/login').send({email: 'bad@email.com', password: credentials.password}).expect(422, done);
    });
    
    it(`should respond with a 422 Unprocessable Entity if the provided login password is incorrect`, function(done) {
        request(server).post('/login').send({email: credentials.email, password: 'incorrect'}).expect(422, done);
    });

    it('should respond with an object containing the user\'s ID', function() {
        return request(server).post('/login').send(credentials).then(function(response) {
            assert(SpecUtil.isNumber(response.body.id));
        });
    });

    it('should respond with an object containing the user\'s email address', function() {
        return request(server).post('/login').send(credentials).then(function(response) {
            assert(SpecUtil.isValidEmail(response.body.email));
        });
    });

    it('should respond with an object containing the user\'s preference for receiving browser notifications', function() {
        return request(server).post('/login').send(credentials).then(function(response) {
            assert.equal(Utility.typeof(response.body.browser_notifications_enabled), 'boolean');
        });
    });

    it(`should not include the account password in the response`, function() {
        return request(server).post('/login').send(credentials).then(function(response) {
            assert(!response.body.password);
        });
    });

    it('should respond with an object containing the user\'s preference for receiving email notifications', function() {
        return request(server).post('/login').send(credentials).then(function(response) {
            assert.equal(Utility.typeof(response.body.email_notifications_enabled), 'boolean');
        });
    });

    it('should respond with an object containing the user\'s email validity status', function() {
        return request(server).post('/login').send(credentials).then(function(response) {
            assert.equal(Utility.typeof(response.body.email_verified), 'boolean');
        });
    });

    it('should respond with an object containing the user\'s default study language code', function() {
        return request(server).post('/login').send(credentials).then(function(response) {
            assert(new RegExp(/[a-z]+/).test(response.body.default_study_language_code));
        });
    });

    it('should respond with an object containing the user\'s profile picture URL', function() {
        return request(server).post('/login').send(credentials).then(function(response) {
            assert(SpecUtil.isValidURL(response.body.picture_url));
        });
    });

    it('should respond with an object containing the user\'s preference for using the profile picture or silhouette image', function() {
        return request(server).post('/login').send(credentials).then(function(response) {
            assert.equal(Utility.typeof(response.body.is_silhouette_picture), 'boolean');
        });
    });
});
