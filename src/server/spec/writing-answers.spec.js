/**
 * writing-answers.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/06.
 */

const request = require('supertest');
const assert = require('assert');
const util = require('./spec-util');

describe('/study/writing_answers', function() {
    let server = null;
    let authorization = null;

    before(function(done) {
        this.timeout(0);
        util.seedAll(done);
    });

    beforeEach(function(done) {
        this.timeout(0);
        util.login(function(_server, _authorization) {
            server = _server;
            authorization = _authorization;
            done();
        });
    });

    afterEach(function(done) {
        server.close(done);
    });

    after(function(done) {
        this.timeout(0);
        util.seedAllUndo(done);
    });

    it('should receive a 200 OK response', function(done) {
        request(server).get('/study/writing_answers').set('authorization', authorization)
            .expect(200, done);
    });

    it('should respond with an object containing a top-level \'records\' array value', function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            assert(new RegExp(/[0-9]+/).test(res.body.records.length));
        });
    });

    it('should respond with an object containing a top-level \'count\' integer value', function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            assert(new RegExp(/[0-9]+/).test(res.body.count));
        });
    });

    it('should have the same number of records as shown in \'count\'', function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            assert(res.body.count === res.body.records.length);
        });
    });

    it('should have an non-null \'id\' number for each record (only checks first 3)', function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            assert(new RegExp(/[0-9]+/).test(res.body.records[0].id));
            assert(new RegExp(/[0-9]+/).test(res.body.records[1].id));
            assert(new RegExp(/[0-9]+/).test(res.body.records[2].id));
        });
    });

    it('should have a non-null \'text\' string for each record (only checks first 3)', function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            assert(res.body.records[0].text.length > 0);
            assert(res.body.records[1].text.length > 0);
            assert(res.body.records[2].text.length > 0);
        });
    });

    it('should have a non-null \'created_at\' datetime for each record (only checks first 3)', function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            let date_01 = new Date(res.body.records[0].created_at);
            let date_02 = new Date(res.body.records[1].created_at);
            let date_03 = new Date(res.body.records[2].created_at);

            assert(date_01.toDateString() !== 'Invalid Date');
            assert(date_02.toDateString() !== 'Invalid Date');
            assert(date_03.toDateString() !== 'Invalid Date');
        });
    });

    it('should have a \'question\' object with a non-null \'text\' string for each record');

    // maximum?
    // load more?
});
