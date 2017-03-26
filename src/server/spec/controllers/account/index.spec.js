/**
 * index.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/15.
 */

const SpecUtil = require('../../spec-util');
const request  = require('supertest');
const assert   = require('assert');
const url      = require('url');
const Utility  = require('../../../app/helpers').Utility;

describe('GET /account', () => {
    let server        = null;
    let authorization = null;
    let emailRegex    = '[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*';

    before(function(done) {
        this.timeout(SpecUtil.defaultTimeout);
        SpecUtil.seedAll(done);
    });

    beforeEach(function(done) {
        this.timeout(SpecUtil.defaultTimeout);
        SpecUtil.login(function(_server, _authorization) {
            server = _server;
            authorization = _authorization;
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
            return request(server).get('/account').set('authorization', authorization).then(function(response) {
                assert(response.header['x-gn-auth-token'].length > 0);
            });
        });

        it('should respond with an X-GN-Auth-Expire header containing a valid timestamp value', function() {
            return request(server).get('/account').set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isParsableDateValue(+response.header['x-gn-auth-expire']));
            });
        });
    });

    it('should respond with 200 OK', function(done) {
        request(server).get('/account').set('authorization', authorization).expect(200, done);
    });

    it('should respond with an object containing the user\'s ID', function() {
        return request(server).get('/account').set('authorization', authorization).then(function(res) {
            assert(new RegExp(/^[0-9]+$/).test(res.body.id));
        });
    });

    it('should respond with an object containing the user\'s email address', function() {
        return request(server).get('/account').set('authorization', authorization).then(function(res) {
            assert(new RegExp(emailRegex).test(res.body.email));
        });
    });

    it('should respond with an object containing the user\'s preference for receiving browser notifications', function() {
        return request(server).get('/account').set('authorization', authorization).then(function(res) {
            assert([true, false].includes(res.body.browser_notifications_enabled));
        });
    });

    it('should respond with an object containing the user\'s preference for receiving email notifications', function() {
        return request(server).get('/account').set('authorization', authorization).then(function(res) {
            assert([true, false].includes(res.body.email_notifications_enabled));
        });
    });

    it('should respond with an object containing the user\'s email validity status', function() {
        return request(server).get('/account').set('authorization', authorization).then(function(res) {
            assert([true, false].includes(res.body.email_verified));
        });
    });

    it('should respond with an object containing the user\'s default study language code', function() {
        return request(server).get('/account').set('authorization', authorization).then(function(res) {
            assert(new RegExp(/^[a-z]+$/).test(res.body.default_study_language_code));
        });
    });

    it('should respond with an object containing the user\'s profile picture URL', function() {
        return request(server).get('/account').set('authorization', authorization).then(function(res) {
            let parsedURL = url.parse(res.body.picture_url);
            assert(parsedURL.protocol);
            assert(parsedURL.hostname);
        });
    });

    it('should respond with an object containing the user\'s preference for using the profile picture or silhouette image', function() {
        return request(server).get('/account').set('authorization', authorization).then(function(res) {
            assert.equal(Utility.typeof(res.body.is_silhouette_picture), 'boolean');
        });
    });
});
