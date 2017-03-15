/**
 * login.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/08.
 */

const SpecUtil = require('../../spec-util');
const Utility  = require('../../../app/helpers').Utility;
const request = require('supertest');
const assert = require('assert');
const url = require('url');

describe('POST /login', function() {
    let server = null;
    const emailRegex = '[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*';
    const credentials = {
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

    it('should respond with 200 OK', function(done) {
        request(server).post('/login').send(credentials).expect(200, done);
    });

    it('should respond with an X-GN-Auth-Token header', function() {
        return request(server).post('/login').send(credentials).then(function(res) {
            assert(res.header['x-gn-auth-token'].length > 0);
        });
    });

    it('should respond with an X-GN-Auth-Expire header containing a valid timestamp value', function() {
        return request(server).post('/login').send(credentials).then(function(res) {
            let timestamp = +res.header['x-gn-auth-expire'];
            let date = new Date(timestamp);
            let dateString = date.toDateString();
            assert(dateString !== 'Invalid Date');
        });
    });

    it('should respond with an object containing the user\'s ID', function() {
        return request(server).post('/login').send(credentials).then(function(res) {
            assert(new RegExp(/^[0-9]+$/).test(res.body.id));
        });
    });

    it('should respond with an object containing the user\'s email address', function() {
        return request(server).post('/login').send(credentials).then(function(res) {
            assert(new RegExp(emailRegex).test(res.body.email));
        });
    });

    it('should respond with an object containing the user\'s preference for receiving browser notifications', function() {
        return request(server).post('/login').send(credentials).then(function(res) {
            assert([true, false].includes(res.body.browser_notifications_enabled));
        });
    });

    it('should respond with an object containing the user\'s preference for receiving email notifications', function() {
        return request(server).post('/login').send(credentials).then(function(res) {
            assert([true, false].includes(res.body.email_notifications_enabled));
        });
    });

    it('should respond with an object containing the user\'s email validity status', function() {
        return request(server).post('/login').send(credentials).then(function(res) {
            assert([true, false].includes(res.body.email_verified));
        });
    });

    it('should respond with an object containing the user\'s default study language code', function() {
        return request(server).post('/login').send(credentials).then(function(res) {
            assert(new RegExp(/[a-z]+/).test(res.body.default_study_language_code));
        });
    });

    it('should respond with an object containing the user\'s profile picture URL', function() {
        return request(server).post('/login').send(credentials).then(function(res) {
            let parsedURL = url.parse(res.body.picture_url);
            assert(parsedURL.protocol);
            assert(parsedURL.hostname);
        });
    });

    it('should respond with an object containing the user\'s preference for using the profile picture or silhouette image', function() {
        return request(server).post('/login').send(credentials).then(function(res) {
            assert.equal(Utility.typeof(res.body.is_silhouette_picture), 'boolean');
        });
    });

    it('should respond with a ??? error if the user is not found');
});
