/**
 * index.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/17.
 */

const request = require('supertest');
const assert  = require('assert');
const util    = require('../../spec-util');
const db      = require('../../../app/models');

describe('GET /videos', function() {
    let server = null;
    let authorization = null;
    let user = null;

    before(function(done) {
        this.timeout(util.defaultTimeout);
        util.seedAll(done);
    });

    beforeEach(function(done) {
        this.timeout(util.defaultTimeout);
        util.login(function(_server, _authorization, _user) {
            server = _server;
            authorization = _authorization;
            user = _user;
            done();
        });
    });

    afterEach(function(done) {
        server.close(done);
    });

    after(function(done) {
        this.timeout(util.defaultTimeout);
        util.seedAllUndo(done);
    });

    describe('headers', function() {
        it('should respond with an X-GN-Auth-Token header', function() {
            request(server).get('/videos').set('authorization', authorization).then(videos => {
                assert(videos.header['x-gn-auth-token'].length > 0);
            });
        });

        it('should respond with an X-GN-Auth-Expire header containing a valid timestamp value', function() {
            request(server).get('/videos').set('authorization', authorization).then(videos => {
                let timestamp = +videos.header['x-gn-auth-expire'];
                let date = new Date(timestamp);
                let dateString = date.toDateString();
                assert(dateString !== 'Invalid Date');
            });
        });
    });

    describe('request parameter validation', function() {
        it(`should return a 400 Bad Request if the request contains a negative 'count' parameter`);
        it(`should return a 400 Bad Request if the request contains a non-numeric 'count' parameter`);
        it(`should return an empty response if the request contains an unidentified 'lang' code parameter`);
        it(`should return a 200 OK response regardless of whether the 'lang' parameter value is upper or lower case`);
        it(`should return a 400 Bad Request if the request contains a negative 'max_id' parameter`);
        it(`should return a 400 Bad Request if the request contains a negative 'topic_id' parameter`);
        it(`should return a 400 Bad Request if the request contains a negative 'category_id' parameter`);
        it(`should respond with a 400 Bad Request if the 'q' parameter is longer than 100 characters`);
        it(`should return only English videos if the request contains no 'lang' parameter`);
        it(`should return no more than 9 video records if the request contains no 'count' parameter`);

        // q
        // full text search
        // transcript
        // collocations
        // category title
        // topic title
        // speaker name
    });

    // format of response

    describe('response format', function() {
        it('should receive a 200 OK response', function(done) {
            request(server).get('/videos').set('authorization', authorization).expect(200, done);
        });

        it(`should respond with an object containing a top-level 'records' array value`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(videos) {
                assert(new RegExp(/^[0-9]+$/).test(videos.body.records.length));
            });
        });

        it(`should respond with an object containing a top-level 'count' integer value`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(videos) {
                assert(new RegExp(/^[0-9]+$/).test(videos.body.count));
            });
        });

        it(`should have the same number of records as shown in 'count'`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(videos) {
                assert(videos.body.count === videos.body.records.length);
            });
        });
    });

    describe('response content', function() {
        it(`should have an non-null 'id' number for each record`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(videos) {
                assert(new RegExp(/^[0-9]+$/).test(videos.body.records[0].id));
            });
        });

        it(`should contain a non-null date string for 'created_at' on each record`);
        it(`should contain a non-null object for 'speaker' on each record`);
        it(`should contain a non-null string for 'speaker.name' on each record`);
        it(`should contain a non-null object for 'topic' on each record`);
        it(`should contain a non-null string for 'topic.name' on each record`);
        it(`should contain a positive number for 'loop_count' on each record`);
        it(`should contain a valid URI string for 'picture_url' on each record`);
        it(`should contain a valid URI string for 'video_url' on each record`);
        it(`should contain a positive number for 'length' on each record`);
        it('should respond with an empty records array if no matching records are found');
        it('should respond with a 0 count if no matching records are found');

        it(`should return only records whose IDs are less than or equal to the 'max_id' query parameter`);
        it(`ignores the 'category_id' parameter if a 'topic_id' parameter is also included in the request`);
    });
});
