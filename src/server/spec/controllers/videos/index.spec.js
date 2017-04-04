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

describe('GET /videos', function() {
    let server = null;
    let authorization = null;
    let user = null;

    before(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAll(), SpecUtil.startMailServer()]);
    });

    beforeEach(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return SpecUtil.login().then(function(_) {
            server = _.server;
            db = _.db;
            authorization = _.authorization;
            user = _.response.body;
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
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert(response.header['x-gn-auth-token'].length > 0);
            });
        });

        it('should respond with an X-GN-Auth-Expire header containing a valid timestamp value', function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isParsableTimestamp(+response.header['x-gn-auth-expire']));
            });
        });
    });

    describe('response.failure', function() {
        it(`should respond with 401 Unauthorized if the request does not contain an 'authorization' header`, function(done) {
            request(server).get('/videos').expect(401, done);
        });

        it(`should return a 400 Bad Request response if the request contains an unidentifiable 'lang' code parameter`, function(done) {
            request(server).get('/videos?lang=notALangCode').set('authorization', authorization).expect(400, done);
        });

        it(`should return a 400 Bad Request response if the request contains a value for 'cued_only' that is not 'true' or 'false'`, function(done) {
            request(server).get('/videos?cued_only=notABoolean').set('authorization', authorization).expect(400, done);
        });

        it(`should return a 400 Bad Request response if the request contains a non-numeric 'count' parameter`, function(done) {
            request(server).get('/videos?count=notANumber').set('authorization', authorization).expect(400, done);
        });

        it(`should return a 400 Bad Request Entity response if the request contains a non-numeric 'max_id' parameter`, function(done) {
            request(server).get('/videos?max_id=notANumber').set('authorization', authorization).expect(400, done);
        });

        it(`should return a 400 Bad Request response if the request contains a non-numeric 'subcategory_id' parameter`, function(done) {
            request(server).get('/videos?subcategory_id=notANumber').set('authorization', authorization).expect(400, done);
        });

        it(`should return a 400 Bad Request response if the request contains a non-numeric 'category_id' parameter`, function(done) {
            request(server).get('/videos?category_id=notANumber').set('authorization', authorization).expect(400, done);
        });

        it(`should return a 400 Bad Request response if the 'count' is above 9`, function(done) {
            request(server).get(`/videos?count=11`).set('authorization', authorization).expect(400, done);
        });

        it(`should return a 400 Bad Request response if the 'count' is 0`, function(done) {
            request(server).get(`/videos?count=0`).set('authorization', authorization).expect(400, done);
        });

        it(`should respond with a 400 Bad Request if the 'q' parameter is longer than 100 characters`, function(done) {
            let q = '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789';
            request(server).get(`/videos?q=${q}`).set('authorization', authorization).expect(400, done);
        });

        it(`should return an error object with a top-level 'errors' array`, function() {
            request(server).get('/videos?subcategory_id=notANumber').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.errors), 'array');
            });
        });

        it(`should return a 'message' string inside the error object`, function() {
            request(server).get('/videos?subcategory_id=notANumber').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.errors[0].message), 'string');
            });
        });

        it(`should return a 'code' number inside the error object`, function() {
            request(server).get('/videos?subcategory_id=notANumber').set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.errors[0].code), 'number');
            });
        });

        // todo: can't include the same parameter more than once
    });

    describe('response.success', function() {
        it('should receive a 200 OK response for a valid request', function(done) {
            request(server).get('/videos').set('authorization', authorization).expect(200, done);
        });

        it(`should return a 200 OK response regardless of whether the 'lang' parameter value is upper or lower case`, function(done) {
            request(server).get('/videos?lang=eN').set('authorization', authorization).expect(200, done);
        });

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

        it(`should contain a non-null 'cued' boolean`, function() {
            return request(server).get(`/videos`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.records[0].cued), 'boolean');
                assert(![null, undefined].includes(response.body.records[0].cued));
            });
        });

        it(`should only return cued videos if the 'cued_only' parameter is set to 'true'`, function() {
            return request(server).get(`/videos?cued_only=true`).set('authorization', authorization).then(function(response) {
                assert.equal(response.body.records[0].cued, true);
            });
        });

        it(`should contain a non-null date string for 'created_at' on each record`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isParsableTimestamp(response.body.records[0].created_at));
            });
        });

        it(`should return the 'created_at' date in the format 'Thu Dec 14 04:35:55 +0000 2017'`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isClientFriendlyDateString(response.body.records[0].created_at));
            });
        });

        it(`should apply the timezone offset in the request to 'created_at'`, function() {
            return request(server).get('/videos?time_zone_offset=-540').set('authorization', authorization).then(function(response) {
                const timeZoneOffset = response.body.records[0].created_at.split(' ')[4];
                assert.equal('+0900', timeZoneOffset);
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
                assert(SpecUtil.isValidURL(response.body.records[0].picture_url));
            });
        });

        it(`should contain a valid URI string for 'video_url' on each record`, function() {
            return request(server).get('/videos').set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isValidURL(response.body.records[0].video_url));
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

        it(`should return 1 video if count is 1`, function() {
            return request(server).get(`/videos?count=1`).set('authorization', authorization).then(function(response) {
                assert.equal(response.body.count, 1);
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
