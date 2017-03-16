/**
 * writing-answers.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/06.
 */

const request = require('supertest');
const assert  = require('assert');
const util    = require('../../spec-util');
const db      = require('../../../app/models');

describe('GET /study/writing_answers', function() {
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

    it('should receive a 200 OK response', function(done) {
        request(server).get('/study/writing_answers').set('authorization', authorization)
            .expect(200, done);
    });

    it(`should respond with an object containing a top-level 'records' array value`, function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            assert(new RegExp(/^[0-9]+$/).test(res.body.records.length));
        });
    });

    it(`should respond with an object containing a top-level 'count' integer value`, function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            assert(new RegExp(/^[0-9]+$/).test(res.body.count));
        });
    });

    it(`should have the same number of records as shown in 'count'`, function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            assert(res.body.count === res.body.records.length);
        });
    });

    it(`should have an non-null 'id' number for each record`, function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            assert(new RegExp(/^[0-9]+$/).test(res.body.records[0].id));
        });
    });

    it(`should have a non-null 'answer' string for each record`, function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            assert(res.body.records[0].answer.length > 0);
        });
    });

    it(`should have a non-null 'created_at' datetime for each record`, function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            let date = new Date(res.body.records[0].created_at);
            assert(date.toDateString() !== 'Invalid Date');
        });
    });

    it(`should have a 'writing_question' object with a non-null 'text' string for each record`, function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            assert(res.body.records[0]['writing_question'].text.length > 0);
        });
    });

    it(`should respond with records whose creation date is equal to or greater than the 'since' query parameter`, function() {
        let thirtyDaysAgo = new Date().getTime() - (1000 * 60 * 60 * 24 * 30);
        return request(server).get(`/study/writing_answers?since=${thirtyDaysAgo}`).set('authorization', authorization).then(function(res) {
            let lastRecord = res.body.records[res.body.count - 1];
            let oldestRecordTimestamp = new Date(lastRecord.created_at).getTime();
            assert(oldestRecordTimestamp >= thirtyDaysAgo);
        });
    });

    it(`should return a 400 response if the 'since' query parameter value is a future date`, (done) => {
        let twoDaysLater = new Date().getTime() + (1000 * 60 * 60 * 24 * 2);
        request(server).get(`/study/writing_answers?since=${twoDaysLater}`).set('authorization', authorization).expect(400, done);
    });

    it(`should return a 400 response if the 'max_id' query param value is 0`, (done) => {
        request(server).get('/study/writing_answers?max_id=0').set('authorization', authorization).expect(400, done);
    });

    it(`should return a 400 response if the 'max_id' query param value is a negative number`, (done) => {
        request(server).get('/study/writing_answers?max_id=-1000').set('authorization', authorization).expect(400, done);
    });

    it('should only return 10 or less answers', function() {
        return request(server).get('/study/writing_answers').set('authorization', authorization).then(function(res) {
            assert(res.body.records.length <= 10, res.body.records.length);
        });
    });

    it(`should return only records whose IDs are less than or equal to the 'max_id' query parameter`, function() {
        let allUserWritingAnswers = `
            SELECT * 
            FROM writing_answers 
            WHERE study_session_id IN (
                SELECT id 
                FROM study_sessions 
                WHERE account_id=${user.id}
            );
        `;

        return db.sequelize.query(allUserWritingAnswers).then(function(answers) {
            let midWritingAnswerId = answers[0][Math.floor(answers[0].length / 2)].id;
            return request(server).get(`/study/writing_answers?max_id=${midWritingAnswerId}`).set('authorization', authorization).then(function(res) {
                let lastId = res.body.records[res.body.count - 1].id;
                assert(lastId >= midWritingAnswerId);
            });
        });
    });
});
