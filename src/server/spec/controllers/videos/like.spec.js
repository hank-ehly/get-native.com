/**
 * like.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/24.
 */

const request  = require('supertest');
const assert   = require('assert');
const SpecUtil = require('../../spec-util');
const Promise  = require('bluebird');

describe('POST /videos/:id/like', function() {
    let server         = null;
    let authorization  = null;
    let user           = null;
    let requestVideoId = null;
    let db             = null;

    before(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAll(), SpecUtil.startMailServer()]);
    });

    beforeEach(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return SpecUtil.login().then(function(initGroup, _authorization, _user) {
            server = initGroup.server;
            db = initGroup.db;
            authorization = _authorization;
            user = _user;

            return db.sequelize.query(`
                SELECT video_id 
                FROM likes 
                WHERE account_id != (
                    SELECT id 
                    FROM accounts 
                    WHERE email = 'test@email.com'
                ) LIMIT 1                
            `).then(r => requestVideoId = r[0][0].video_id);
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
            return request(server).get(`/videos/${requestVideoId}/like`).set('authorization', authorization).then(function(response) {
                assert(response.header['x-gn-auth-token'].length > 0);
            });
        });

        it('should respond with an X-GN-Auth-Expire header containing a valid timestamp value', function() {
            return request(server).get(`/videos/${requestVideoId}/like`).set('authorization', authorization).then(function(response) {
                assert(SpecUtil.isParsableDateValue(+response.header['x-gn-auth-expire']));
            });
        });
    });

    describe('response.failure', function() {
        it(`should respond with 401 Unauthorized if the request does not contain an 'authorization' header`, function(done) {
            return request(server).get(`/videos/${requestVideoId}/like`).expect(401, done);
        });

        it(`should return 404 Not Found if the specified video is not found`, function(done) {
            request(server).post('/videos/999999999/like').set('authorization', authorization).expect(404, done);
        });

        it(`should return 400 Bad Request if the required :id is not a number`, function(done) {
            request(server).post('/videos/x/like').set('authorization', authorization).expect(400, done);
        });

        it(`should return 400 Bad Request if the required :id is 0`, function(done) {
            request(server).post(`/videos/0/like`).set('authorization', authorization).expect(400, done);
        });
    });

    describe('response.success', function() {
        it(`should respond with 204 No Content if the request succeeds`, function(done) {
            request(server).post(`/videos/${requestVideoId}/like`).set('authorization', authorization).expect(204, done);
        });

        it(`should increment the video's 'like_count' by 1`, function() {
            // get current like_count
            return db.sequelize.query(`SELECT COUNT(*) AS \`like_count\` FROM \`likes\` WHERE video_id = ${requestVideoId}`).then(r => {
                const beforeLikeCount = parseInt(r[0][0].like_count);

                // perform request
                return request(server).post(`/videos/${requestVideoId}/like`).set('authorization', authorization).then(() => {

                    // get incremented like_count
                    return db.sequelize.query(`SELECT COUNT(*) AS \`like_count\` FROM \`likes\` WHERE video_id = ${requestVideoId}`).then(r => {
                        const afterLikeCount = parseInt(r[0][0].like_count);

                        assert.equal(afterLikeCount, beforeLikeCount + 1);
                    });
                });
            });
        });
    });
});
