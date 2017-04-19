/**
 * stats.spec
 * get-native.com
 *
 * Created by henryehly on 2017/04/05.
 */

const request  = require('supertest');
const assert   = require('assert');
const SpecUtil = require('../../spec-util');
const Promise  = require('bluebird');
const Utility  = require('../../../app/services').Utility;

describe('GET /study/stats', function() {
    let authorization = null;
    let server        = null;
    let user          = null;
    let db            = null;

    before(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAll(), SpecUtil.startMailServer()]);
    });

    beforeEach(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return SpecUtil.login().then(function(_) {
            authorization = _.authorization;
            server        = _.server;
            user          = _.response.body;
            db            = _.db;
        });
    });

    afterEach(function(done) {
        server.close(done);
    });

    after(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAllUndo(), SpecUtil.stopMailServer()]);
    });

    describe('response.headers', function() {
        it('should respond with an X-GN-Auth-Token header', function() {
            return request(server).get('/study/stats/en').set('authorization', authorization).then(function(response) {
                assert(response.header['x-gn-auth-token'].length > 0);
            });
        });

        it('should respond with an X-GN-Auth-Expire header containing a valid timestamp value', function() {
            return request(server).get('/study/stats/en').set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isParsableTimestamp(+response.header['x-gn-auth-expire']));
            });
        });
    });

    describe('response.failure', function() {
        it(`should respond with 401 Unauthorized if the request does not contain an 'authorization' header`, function(done) {
            request(server).get('/study/stats/en').expect(401, done);
        });

        it(`should respond with 400 Bad Request if the 'lang' parameter is not a valid language code`, function(done) {
            request(server).get('/study/stats/notValid').set('authorization', authorization).expect(400, done);
        });
    });

    describe('response.success', function() {
        it('should response with 200 OK for a valid request', function(done) {
            request(server).get('/study/stats/en').set('authorization', authorization).expect(200, done);
        });

        it(`should contain a non-null 'lang' language code which is the same as the request param code`, function() {
            return request(server).get('/study/stats/en').set('authorization', authorization).then(function(response) {
                assert.equal('en', response.body.lang);
            });
        });

        it(`should contain a non-null 'total_time_studied' number`, function() {
            return request(server).get('/study/stats/en').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.total_time_studied), 'number');
            });
        });

        it(`should contain a non-null 'consecutive_days' number`, function() {
            return request(server).get('/study/stats/en').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.consecutive_days), 'number');
            });
        });

        it(`should contain a non-null 'total_study_sessions' number`, function() {
            return request(server).get('/study/stats/en').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.total_study_sessions), 'number');
            });
        });

        it(`should contain a non-null 'longest_consecutive_days' number`, function() {
            return request(server).get('/study/stats/en').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.longest_consecutive_days), 'number');
            });
        });

        it(`should contain a non-null 'maximum_words' number`, function() {
            return request(server).get('/study/stats/en').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.maximum_words), 'number');
            });
        });

        it(`should contain a non-null 'maximum_wpm' number`, function() {
            return request(server).get('/study/stats/en').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.maximum_wpm), 'number');
            });
        });
    });

    describe('other', function() {
        // todo: make sure the DATA itself is correct
    });
});
