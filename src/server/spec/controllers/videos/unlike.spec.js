/**
 * unlike.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/24.
 */

const request  = require('supertest');
const assert   = require('assert');
const SpecUtil = require('../../spec-util');
const db       = require('../../../app/models');
const Promise  = require('bluebird');

describe('POST /videos/:id/unlike', function() {
    let server         = null;
    let authorization  = null;
    let user           = null;
    let requestVideoId = null;

    before(function(done) {
        this.timeout(SpecUtil.defaultTimeout);
        Promise.all([SpecUtil.seedAll(), SpecUtil.startMailServer()]).then(() => {
            db.sequelize.query(`
                SELECT video_id 
                FROM likes 
                WHERE account_id = (
                    SELECT id 
                    FROM accounts 
                    WHERE email = 'test@email.com'
                ) LIMIT 1
            `).then(r => {
                requestVideoId = r[0][0].video_id;
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
        it(`should return 422 Unprocessable Entity if the required :id is not a number`, function(done) {
            request(server).post('/videos/x/unlike').set('authorization', authorization).expect(422, done);
        });

        it(`should return 422 Unprocessable Entity if the required :id is 0`, function(done) {
            request(server).post(`/videos/0/unlike`).set('authorization', authorization).expect(422, done);
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
        it(`should respond with 204 No Content if the request succeeds`, function(done) {
            request(server).post(`/videos/${requestVideoId}/unlike`).set('authorization', authorization).expect(204, done);
        });

        it(`should return 404 Not Found if the specified video is not found`, function(done) {
            request(server).post('/videos/999999999/unlike').set('authorization', authorization).expect(404, done);
        });

        it(`should decrement the video's 'like_count' by 1`, function() {
            // get current like_count
            return db.sequelize.query(`SELECT COUNT(*) AS \`like_count\` FROM \`likes\` WHERE \`video_id\` = ${requestVideoId}`).then(function(r) {
                const beforeLikeCount = parseInt(r[0][0].like_count); // ex. 3

                // perform request
                return request(server).post(`/videos/${requestVideoId}/unlike`).set('authorization', authorization).then(function() {

                    // get decremented like_count
                    return db.sequelize.query(`SELECT COUNT(*) AS \`like_count\` FROM \`likes\` WHERE \`video_id\` = ${requestVideoId}`).then(function(r) {
                        const afterLikeCount = parseInt(r[0][0].like_count); // ex. 2

                        assert.equal(afterLikeCount, beforeLikeCount - 1);
                    });
                });
            });
        });
    });
});
