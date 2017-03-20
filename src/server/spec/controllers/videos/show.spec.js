/**
 * show.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/20.
 */

const assert = require('assert');
const SpecUtil = require('../../spec-util');
const Utility  = require('../../../app/helpers').Utility;
const request  = require('supertest');

describe('GET /videos/:id', function() {
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
        it(`should return a 200 OK response given a valid request`);
        it(`should return a 400 Bad Request response if the :id parameter is missing`);
        it(`should return a 422 Unprocessable Entity response if the :id parameter is not an integer`);
        it(`should return a 422 Unprocessable Entity response if the :id parameter is 0`);
    });

    describe('response.header', function() {
        it('should respond with an X-GN-Auth-Token header', function() {
            return request(server).get('/videos/1').set('authorization', authorization).then(function(response) {
                assert(response.header['x-gn-auth-token'].length > 0);
            });
        });

        it('should respond with an X-GN-Auth-Expire header containing a valid timestamp value', function() {
            return request(server).get('/videos/1').set('authorization', authorization).then(function(response) {
                let timestamp = +response.header['x-gn-auth-expire'];
                let date = new Date(timestamp);
                let dateString = date.toDateString();
                assert(dateString !== 'Invalid Date');
            });
        });
    });

    describe('response.body', function() {
        it(`should contain a non-null 'cued' boolean`);
        it(`should contain a non-null 'description' string`);
        it(`should contain a non-null 'id' integer`);
        it(`should contain a non-null 'speaker' object`);
        it(`should contain a non-null 'speaker.id' integer`);
        it(`should contain a non-null 'speaker.description' string`);
        it(`should contain a non-null 'speaker.name' string`);
        it(`should contain a non-null 'speaker.picture_url' url string`);
        it(`should contain a non-null 'subcategory' object`);
        it(`should contain a non-null 'subcategory.id' integer`);
        it(`should contain a non-null 'subcategory.name' string`);
        it(`should contain a non-null 'loop_count' integer`);
        it(`should contain a non-null 'picture_url' url string`);
        it(`should contain a non-null 'video_url' url string`);
        it(`should contain a non-null 'related_videos' object`);
        it(`should contain a non-null 'related_videos.records' array`);
        it(`should contain a non-null 'related_videos.count' integer`);
        it(`should contain the same count for related_videos.records.length and related_videos.count`);
        it(`should contain a non-null 'like_count' integer`);
        it(`should contain a non-null 'liked' boolean`);
        it(`should contain a non-null 'length' integer`);
        it(`should contain a non-null 'transcripts' array`);
        it(`should contain a non-null 'transcripts.records' array`);
        it(`should contain a non-null 'transcripts.count' integer`);
        it(`transcripts.records.length and transcripts.count should be equal`);
        it(`should contain a non-null 'transcripts.records[N].text' string`);
        it(`should contain a non-null 'transcripts.records[N].lang' language code string`);
        it(`should contain a non-null 'transcripts.records[N].collocations' object`);
        it(`should contain a non-null 'transcripts.records[N].collocations.records' array`);
        it(`should contain a non-null 'transcripts.records[N].collocations.count' integer`);
        it(`collocations.records.length and collocations.count should be equal`);
        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].text' string`);
        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].description' string`);
        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].pronunciation' string`);
        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].usage_examples' object`);
        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].usage_examples.records' array`);
        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].usage_examples.count' integer`);
        it(`usage_examples.records.length should be equal to usage_examples.count`);
        it(`should contain a non-null 'transcripts.records[N].collocations.records[N].usage_examples.records[N].text' string`);
    });
});
