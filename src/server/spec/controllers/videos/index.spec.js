/**
 * index.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/17.
 */

const request  = require('supertest');
const assert   = require('assert');
const SpecUtil = require('../../spec-util');
const Utility  = require('../../../app/helpers').Utility;
const db       = require('../../../app/models');
const url      = require('url');

describe('GET /videos', function() {
    let server = null;
    let authorization = null;
    let user = null;

    before(function(done) {
        this.timeout(SpecUtil.defaultTimeout);
        SpecUtil.seedAll(done);
    });

    beforeEach(function(done) {
        this.timeout(SpecUtil.defaultTimeout);
        SpecUtil.login(function(_server, _authorization, _user) {
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
        this.timeout(SpecUtil.defaultTimeout);
        SpecUtil.seedAllUndo(done);
    });

    describe('request', function() {
        it('should receive a 200 OK response for a valid request', function(done) {
            request(server).get('/videos').set('authorization', authorization).expect(200, done);
        });

        it(`should return a 422 Unprocessable Entity response if the request contains an unidentifiable 'lang' code parameter`, function(done) {
            request(server).get('/videos?lang=notALangCode').set('authorization', authorization).expect(422, done);
        });

        it(`should return a 422 Unprocessable Entity response if the request contains a non-numeric 'count' parameter`, function(done) {
            request(server).get('/videos?count=notANumber').set('authorization', authorization).expect(422, done);
        });

        it(`should return a 200 OK response regardless of whether the 'lang' parameter value is upper or lower case`, function(done) {
            request(server).get('/videos?lang=eN').set('authorization', authorization).expect(200, done);
        });

        it(`should return a 422 Unprocessable Entity response if the request contains a non-numeric 'max_id' parameter`, function(done) {
            request(server).get('/videos?max_id=notANumber').set('authorization', authorization).expect(422, done);
        });

        it(`should return a 422 Unprocessable Entity response if the request contains a non-numeric 'subcategory_id' parameter`, function(done) {
            request(server).get('/videos?subcategory_id=notANumber').set('authorization', authorization).expect(422, done);
        });

        it(`should return a 422 Unprocessable Entity response if the request contains a non-numeric 'category_id' parameter`, function(done) {
            request(server).get('/videos?category_id=notANumber').set('authorization', authorization).expect(422, done);
        });

        it(`should return a 422 Unprocessable Entity response if the 'count' is above 9`, function(done) {
            return request(server).get(`/videos?count=11`).set('authorization', authorization).then((res) => console.log(res.body)).expect(422, done);
        });

        it(`should respond with a 422 Unprocessable Entity if the 'q' parameter is longer than 100 characters`, function(done) {
            let q = '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789';
            request(server).get(`/videos?q=${q}`).set('authorization', authorization).expect(422, done);
        });

        it(`should return an object with a non-null 'message' string in a 422 Unprocessable Entity response`, function() {
            return request(server).get(`/videos?lang=notALangCode`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.message), 'string');
                assert.notEqual(response.body.message.length, 0);
            });
        });

        it(`should return 1 or more 'error' objects in a 422 Unprocessable Entity response`, function() {
            request(server).get('/videos?subcategory_id=notANumber').set('authorization', authorization).then(function(response) {
                assert(response.errors.length > 0);
            });
        });

        // todo: can't include the same parameter more than once
    });

    describe('response.header', function() {
        it('should respond with an X-GN-Auth-Token header', function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert(response.header['x-gn-auth-token'].length > 0);
            });
        });

        it('should respond with an X-GN-Auth-Expire header containing a valid timestamp value', function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                let timestamp = +response.header['x-gn-auth-expire'];
                let date = new Date(timestamp);
                let dateString = date.toDateString();
                assert(dateString !== 'Invalid Date');
            });
        });
    });

    describe('response.body', function() {
        it(`should respond with an object containing a top-level 'records' array value`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isNumber(response.body.records.length));
            });
        });

        it(`should respond with an object containing a top-level 'count' integer value`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isNumber(response.body.count));
            });
        });

        it(`should have the same number of records as shown in 'count'`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert(response.body.count === response.body.records.length);
            });
        });

        it(`should have an non-null 'id' number for each record`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isNumber(response.body.records[0].id));
            });
        });

        it(`should contain a non-null date string for 'created_at' on each record`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isParsableDateValue(response.body.records[0].created_at));
            });
        });

        it(`should contain a non-null object for 'speaker' on each record`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.records[0].speaker), 'object');
            });
        });

        it(`should contain a non-null string for 'speaker.name' on each record`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.records[0].speaker.name), 'string');
                assert.notEqual(response.body.records[0].speaker.name.length, 0);
            });
        });

        it(`should contain a non-null object for 'subcategory' on each record`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.records[0].subcategory), 'object');
            });
        });

        it(`should contain a non-null string for 'subcategory.name' on each record`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.records[0].subcategory.name), 'string');
                assert.notEqual(response.body.records[0].speaker.name.length, 0);
            });
        });

        it(`should contain a positive number for 'loop_count' on each record`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.records[0].loop_count), 'number');
                assert(response.body.records[0].loop_count > 0);
            });
        });

        it(`should contain a valid URI string for 'picture_url' on each record`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                let parsedURL = url.parse(response.body.records[0].picture_url);
                assert(parsedURL.protocol);
                assert(parsedURL.hostname);
            });
        });

        it(`should contain a valid URI string for 'video_url' on each record`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                let parsedURL = url.parse(response.body.records[0].video_url);
                assert(parsedURL.protocol);
                assert(parsedURL.hostname);
            });
        });

        it(`should contain a positive number for 'length' on each record`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.records[0]['length']), 'number');
                assert.notEqual(response.body.records[0]['length'], 0);
            });
        });

        it('should respond with an empty records array if no matching records are found', function() {
            let extremeValue = '99999999';
            let requestURLString = `/videos?max_id=${extremeValue}&category_id=${extremeValue}&lang=ja&q=${extremeValue}`;
            return request(server).get(requestURLString).set('authorization', authorization).then(function(response) {
                assert.equal(response.body.records.length, 0);
            });
        });

        it('should respond with a 0 count if no matching records are found', function() {
            let extremeValue = '99999999';
            let requestURLString = `/videos?max_id=${extremeValue}&category_id=${extremeValue}&lang=ja&q=${extremeValue}`;
            return request(server).get(requestURLString).set('authorization', authorization).then(function(response) {
                assert.equal(response.body.count, 0);
            });
        });

        it(`should return only records whose IDs are less than or equal to the 'max_id' query parameter`, function() {
            return db.sequelize.query('SELECT * FROM videos').then(function(videos) {
                let midVideoId = videos[0][Math.floor(videos[0].length / 2)].id;
                return request(server).get(`/videos?max_id=${midVideoId}`).set('authorization', authorization).then(function(response) {
                    let lastId = response.body.records[response.body.count - 1].id;
                    assert(lastId >= midVideoId);
                });
            });
        });

        it(`should return no more than 9 video records`, function() {
            return request(server).get(`/videos`).set('authorization', authorization).then(function(response) {
                assert(response.body.count <= 9);
            });
        });

        it(`should return 1 or less videos if count is 1`, function() {
            return request(server).get(`/videos?count=1`).set('authorization', authorization).then(function(response) {
                assert(response.body.count <= 1);
            });
        });

        it(`should return only English videos if the request contains no 'lang' parameter`, function() {
            return request(server).get(`/videos`).set('authorization', authorization).then(function(response) {
                let firstVideoId = response.body.records[0].id;
                return db.sequelize.query(`SELECT language_code FROM videos WHERE videos.id = ${firstVideoId} LIMIT 1`).then(function(result) {
                    let videoLanguageCode = result[0][0].language_code;
                    assert.equal(videoLanguageCode, 'en');
                });
            });
        });

        // todo e2e (check the category_id and subcategory_id don't conflict

        // q
        // full text search
        // transcript
        // collocations
        // category title
        // subcategory title
        // speaker name
    });
});
