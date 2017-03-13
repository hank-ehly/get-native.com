/**
 * categories
 * get-native.com
 *
 * Created by henryehly on 2017/03/02.
 */

const request = require('supertest');
const assert = require('assert');
const util = require('../spec-util');

describe('/categories', function() {
    let server        = null;
    let authorization = null;

    before(function(done) {
        this.timeout(util.defaultTimeout);
        util.seedAll(done);
    });

    beforeEach(function(done) {
        this.timeout(util.defaultTimeout);
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
        this.timeout(util.defaultTimeout);
        util.seedAllUndo(done);
    });

    it('should return a 200 response', function(done) {
        request(server).get('/categories').set('authorization', authorization)
            .expect(200, done);
    });

    it('should respond with an object containing a top-level \'count\' property of integer type', function() {
        return request(server).get('/categories').set('authorization', authorization).then(function(res) {
            assert(new RegExp(/[0-9]+/).test(res.body.count));
        });
    });

    it('should respond with an object containing a top-level \'records\' property of array type', function() {
        return request(server).get('/categories').set('authorization', authorization).then(function(res) {
            assert(new RegExp(/[0-9]+/).test(res.body.records.length));
        });
    });

    it('should respond with an object containing a sub-level \'subcategories\' property for the first object in the top-level \'records\' array', function() {
        return request(server).get('/categories').set('authorization', authorization).then(function(res) {
            assert(typeof res.body.records[0].subcategories === 'object');
        });
    });

    it('should respond with an object containing a sub-level \'count\' property of integer type for the first object in the top-level \'records\' array', function() {
        return request(server).get('/categories').set('authorization', authorization).then(function(res) {
            assert(new RegExp(/[0-9]+/).test(res.body.records[0].subcategories['count']));
        });
    });

    it('should respond with an object containing a sub-level \'records\' property of array type for the first object in the top-level \'records\' array', function() {
        return request(server).get('/categories').set('authorization', authorization).then(function(res) {
            assert(new RegExp(/[0-9]+/).test(res.body.records[0].subcategories.records['length']));
        });
    });

    it('should return more than 0 subcategories', function() {
        return request(server).get('/categories').set('authorization', authorization).then(function(res) {
            assert(res.body.records[0].subcategories.records.length > 0);
        });
    });

    it('should set the count integer value to the number of top-level records', function() {
        return request(server).get('/categories').set('authorization', authorization).then(function(res) {
            let count = res.body.count;
            let recordsLength = res.body.records.length;
            assert(count === recordsLength);
        });
    });

    it('should set the count integer value for a topic to the number of subcategories included in the category', function() {
        return request(server).get('/categories').set('authorization', authorization).then(function(res) {
            let count = res.body.records[0].subcategories.count;
            let recordsLength = res.body.records[0].subcategories.records.length;
            assert(count === recordsLength);
        });
    });
});
