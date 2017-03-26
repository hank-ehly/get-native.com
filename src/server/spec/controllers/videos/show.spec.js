/**
 * show.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/20.
 */

const db       = require('../../../app/models');
const assert   = require('assert');
const SpecUtil = require('../../spec-util');
const Utility  = require('../../../app/helpers').Utility;
const request  = require('supertest');
const Promise  = require('bluebird');

describe('GET /videos/:id', function() {
    let server         = null;
    let authorization  = null;
    let user           = null;
    let requestVideoId = null;

    before(function(done) {
        this.timeout(SpecUtil.defaultTimeout);
        Promise.all([SpecUtil.seedAll(), SpecUtil.startMailServer()]).then(() => {
            db.sequelize.query('SELECT id FROM videos LIMIT 1').then(r => {
                requestVideoId = r[0][0].id;
                done();
            });
        });
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

    after(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAllUndo(), SpecUtil.stopMailServer()]);
    });

    describe('request', function() {
        it(`should return a 200 OK response given a valid request`, function(done) {
            request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).expect(200, done);
        });

        it(`should return a 422 Unprocessable Entity response if the :id parameter is not an integer`, function(done) {
            request(server).get('/videos/notAnInteger').set('authorization', authorization).expect(422, done);
        });

        it(`should return a 422 Unprocessable Entity response if the :id parameter is 0`, function(done) {
            request(server).get('/videos/0').set('authorization', authorization).expect(422, done);
        });
    });

    describe('response.header', function() {
        it('should respond with an X-GN-Auth-Token header', function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert(response.header['x-gn-auth-token'].length > 0);
            });
        });

        it('should respond with an X-GN-Auth-Expire header containing a valid timestamp value', function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isParsableDateValue(+response.header['x-gn-auth-expire']));
            });
        });
    });

    describe('response.body', function() {
        it(`should contain a non-null 'cued' boolean`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.cued), 'boolean');
                assert(![null, undefined].includes(response.body.cued));
            });
        });

        it(`should contain a non-null 'description' string`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.description), 'string');
                assert(![null, undefined].includes(response.body.description));
            });
        });

        it(`should contain a non-null 'id' integer`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.id), 'number');
                assert(![null, undefined].includes(response.body.id));
            });
        });

        it(`should contain a non-null 'speaker' object`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.speaker), 'object');
                assert(![null, undefined].includes(response.body.speaker));
            });
        });

        it(`should contain a non-null 'speaker.id' integer`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.speaker.id), 'number');
                assert(![null, undefined].includes(response.body.speaker.id));
            });
        });

        it(`should contain a non-null 'speaker.description' string`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.speaker.description), 'string');
                assert(![null, undefined].includes(response.body.speaker.description));
            });
        });

        it(`should contain a non-null 'speaker.name' string`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.speaker.name), 'string');
                assert(![null, undefined].includes(response.body.speaker.name));
            });
        });

        it(`should contain a non-null 'speaker.picture_url' url string`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isValidURL(response.body.speaker.picture_url));
            });
        });

        it(`should contain a non-null 'subcategory' object`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.subcategory), 'object');
                assert(![null, undefined].includes(response.body.subcategory));
            });
        });

        it(`should contain a non-null 'subcategory.id' integer`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.subcategory.id), 'number');
                assert(![null, undefined].includes(response.body.subcategory.id));
            });
        });

        it(`should contain a non-null 'subcategory.name' string`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.subcategory.name), 'string');
                assert(![null, undefined].includes(response.body.subcategory.name));
            });
        });

        it(`should contain a non-null 'loop_count' integer`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.loop_count), 'number');
                assert(![null, undefined].includes(response.body.loop_count));
            });
        });

        it(`should contain a non-null 'picture_url' url string`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isValidURL(response.body.picture_url));
            });
        });

        it(`should contain a non-null 'video_url' url string`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isValidURL(response.body.video_url));
            });
        });

        it(`should contain a non-null 'related_videos' object`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.related_videos), 'object');
                assert(![null, undefined].includes(response.body.related_videos));
            });
        });

        it(`should contain a non-null 'related_videos.records' array`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.related_videos.records), 'array');
                assert(![null, undefined].includes(response.body.related_videos.records));
            });
        });

        it(`should contain a non-null 'related_videos.count' integer`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.related_videos.count), 'number');
                assert(![null, undefined].includes(response.body.related_videos.count));
            });
        });

        it(`related_videos.records.length and related_videos.count should be equal`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(response.body.related_videos.records.length, response.body.related_videos.count);
            });
        });

        it(`should return at most 3 related videos`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert(response.body.related_videos.count <= 3);
                assert(response.body.related_videos.records.length <= 3);
            });
        });

        it(`should contains a non-null 'related_videos.records[N].cued boolean`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.related_videos.records[0].cued), 'boolean');
                assert(![null, undefined].includes(response.body.related_videos.records[0].cued));
            });
        });

        it(`should contain a non-null 'like_count' integer`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.like_count), 'number');
                assert(![null, undefined].includes(response.body.like_count));
            });
        });

        it(`should contain a non-null 'liked' boolean`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.liked), 'boolean');
                assert(![null, undefined].includes(response.body.liked));
            });
        });

        it(`should contain a non-null 'length' integer`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.length), 'number');
                assert(![null, undefined].includes(response.body.length));
            });
        });

        it(`should contain a non-null 'transcripts' object`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts), 'object');
                assert(![null, undefined].includes(response.body.transcripts));
            });
        });

        it(`should contain a non-null 'transcripts.records' array`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.records), 'array');
                assert(![null, undefined].includes(response.body.transcripts.records));
            });
        });

        it(`should contain a non-null 'transcripts.count' integer`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.count), 'number');
                assert(![null, undefined].includes(response.body.transcripts.count));
            });
        });

        it(`transcripts.records.length and transcripts.count should be equal`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(response.body.transcripts.records.length, response.body.transcripts.count);
            });
        });

        it(`should contain a non-null 'transcripts.records[N].text' string`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.records[0]), 'object');
                assert(![null, undefined].includes(response.body.transcripts.records[0]));
            });
        });

        it(`should contain a non-null 'transcripts.records[N].language_code' string`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.records[0].language_code), 'string');
                assert(![null, undefined].includes(response.body.transcripts.records[0].language_code));
            });
        });

        it(`should contain a non-null 'transcripts.records[N].collocations' object`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.records[0].collocations), 'object');
                assert(![null, undefined].includes(response.body.transcripts.records[0].collocations));
            });
        });

        it(`should contain a non-null 'transcripts.records[N].collocations.records' array`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.records[0].collocations.records), 'array');
                assert(![null, undefined].includes(response.body.transcripts.records[0].collocations.records));
            });
        });

        it(`should contain a non-null 'transcripts.records[N].collocations.count' integer`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.records[0].collocations.count), 'number');
                assert(![null, undefined].includes(response.body.transcripts.records[0].collocations.count));
            });
        });

        it(`collocations.records.length and collocations.count should be equal`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(response.body.transcripts.records[0].collocations.records.length,
                    response.body.transcripts.records[0].collocations.count);
            });
        });

        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].text' string`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.records[0].collocations.count), 'number');
                assert(![null, undefined].includes(response.body.transcripts.records[0].collocations.count));
            });
        });

        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].description' string`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.records[0].collocations.records[0].description), 'string');
                assert(![null, undefined].includes(response.body.transcripts.records[0].collocations.records[0].description));
            });
        });

        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].ipa_spelling' string`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.records[0].collocations.records[0].ipa_spelling), 'string');
                assert(![null, undefined].includes(response.body.transcripts.records[0].collocations.records[0].ipa_spelling));
            });
        });

        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].usage_examples' object`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.records[0].collocations.records[0].usage_examples), 'object');
                assert(![null, undefined].includes(response.body.transcripts.records[0].collocations.records[0].usage_examples));
            });
        });

        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].usage_examples.records' array`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.records[0].collocations.records[0].usage_examples.records), 'array');
                assert(![null, undefined].includes(response.body.transcripts.records[0].collocations.records[0].usage_examples.records));
            });
        });

        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].usage_examples.count' integer`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.records[0].collocations.records[0].usage_examples.count), 'number');
                assert(![null, undefined].includes(response.body.transcripts.records[0].collocations.records[0].usage_examples.count));
            });
        });

        it(`usage_examples.records.length should be equal to usage_examples.count`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(response.body.transcripts.records[0].collocations.records[0].usage_examples.records.length,
                    response.body.transcripts.records[0].collocations.records[0].usage_examples.count);
            });
        });

        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].usage_examples.records[N].text' string`, function() {
            return request(server).get(`/videos/${requestVideoId}`).set('authorization', authorization).then(function(response) {
                assert.equal(Utility.typeof(response.body.transcripts.records[0].collocations.records[0].usage_examples.records[0].text), 'string');
                assert(![null, undefined].includes(response.body.transcripts.records[0].collocations.records[0].usage_examples.records[0].text));
            });
        });
    });
});
