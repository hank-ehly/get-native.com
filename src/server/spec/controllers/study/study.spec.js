/**
 * study.spec
 * get-native.com
 *
 * Created by henryehly on 2017/04/29.
 */

const SpecUtil = require('../../spec-util');
const k        = require('../../../config/keys.json');

const Promise = require('bluebird');
const request = require('supertest');
const assert  = require('assert');
const _       = require('lodash');

describe('POST /study', function() {
    let authorization = null;
    let account       = null;
    let reqBody       = null;
    let server        = null;
    let db            = null;


    before(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.join(SpecUtil.seedAll(), SpecUtil.startMailServer());
    });

    beforeEach(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return SpecUtil.login().then(function(initGroup) {
            authorization = initGroup.authorization;
            account       = initGroup.response.body;
            server        = initGroup.server;
            db            = initGroup.db;

            const byAccountId = {
                where: {
                    account_id: account.id
                }
            };

            return db.StudySession.findAll(byAccountId).then(function(studySessions) {
                return db.WritingAnswer.destroy({
                    where: {
                        study_session_id: {
                            $in: _.map(studySessions, 'id')
                        }
                    }
                });
            }).then(function() {
                return Promise.join(db.CuedVideo.destroy(byAccountId), db.StudySession.destroy(byAccountId));
            }).then(function() {
                return db.Video.findOne();
            }).then(function(video) {
                reqBody = {
                    video_id: video.get(k.Attr.Id),
                    time: 300
                };
            });
        });
    });

    afterEach(function(done) {
        server.close(done);
    });

    after(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.join(SpecUtil.seedAllUndo(), SpecUtil.stopMailServer());
    });

    describe('response.headers', function() {
        it('should respond with an X-GN-Auth-Token header', function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(_.gt(response.header[k.Header.AuthToken].length, 0));
            });
        });

        it('should respond with an X-GN-Auth-Expire header containing a valid timestamp value', function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(SpecUtil.isParsableTimestamp(+response.header[k.Header.AuthExpire]));
            });
        });
    });

    describe('response.failure', function() {
        it(`should respond with 400 Bad Request if the 'video_id' request body parameter is missing`, function(done) {
            request(server).post('/study').set('authorization', authorization).send({time: reqBody.time}).expect(400, done);
        });

        it(`should respond with 400 Bad Request if the 'video_id' request body parameter is not a number`, function(done) {
            request(server).post('/study').set('authorization', authorization).send({
                time: reqBody.time,
                video_id: 'not_a_number'
            }).expect(400, done);
        });

        it(`should respond with 400 Bad Request if the 'video_id' request body parameter is negative`, function(done) {
            request(server).post('/study').set('authorization', authorization).send({
                time: reqBody.time,
                video_id: -6
            }).expect(400, done);
        });

        it(`should respond with 400 Bad Request if the 'video_id' request body parameter is 0`, function(done) {
            request(server).post('/study').set('authorization', authorization).send({
                time: reqBody.time,
                video_id: 0
            }).expect(400, done);
        });

        it(`should respond with 400 Bad Request if the 'time' request body parameter is missing`, function(done) {
            request(server).post('/study').set('authorization', authorization).send({
                video_id: reqBody.video_id
            }).expect(400, done);
        });

        it(`should respond with 400 Bad Request if the 'time' request body parameter is not a number`, function(done) {
            request(server).post('/study').set('authorization', authorization).send({
                time: 'not_a_number',
                video_id: reqBody.video_id
            }).expect(400, done);
        });

        it(`should respond with 400 Bad Request if the 'time' request body parameter is negative`, function(done) {
            request(server).post('/study').set('authorization', authorization).send({
                time: -reqBody.time,
                video_id: reqBody.video_id
            }).expect(400, done);
        });
    });

    describe('response.success', function() {
        it(`should respond with 200 OK for a valid request`, function(done) {
            request(server).post('/study').set('authorization', authorization).send(reqBody).expect(200, done);
        });

        it(`should contain a non-zero 'id' integer`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(_.gt(response.body.id, 0));
            });
        });

        it(`should contain a 'picture_url' valid URL string`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(SpecUtil.isValidURL(response.body.picture_url));
            });
        });

        it(`should contain a 'video_url' valid URL string`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(SpecUtil.isValidURL(response.body.video_url));
            });
        });

        it(`should contain a non-zero 'length' integer`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(_.gt(response.body.length, 0));
            });
        });

        it(`should contain a 'transcripts' object`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(_.isPlainObject(response.body.transcripts));
            });
        });

        it(`should contain a non-zero 'transcripts.count' integer`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(_.gt(response.body.transcripts.count, 0));
            });
        });

        it(`should contain a 'transcripts.records' array`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(_.isArray(response.body.transcripts.records));
            });
        });

        it(`should contain a non-zero 'transcripts.records[N].id' integer`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(_.gt(_.first(response.body.transcripts.records).id, 0));
            });
        });

        it(`should contain a 'transcripts.records[N].text' string with a length greater than 0`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                const text = _.first(response.body.transcripts.records).text;
                assert(_.isString(text));
                assert(_.gt(text.length, 0));
            });
        });

        it(`should contain a 'transcripts.records[N].language_code' string with a length greater than 0`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                const languageCode = _.first(response.body.transcripts.records)[k.Attr.LanguageCode];
                assert(_.isString(languageCode));
                assert(_.gt(languageCode.length, 0));
            });
        });

        it(`should contain a 'transcripts.records[N].collocations' object`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(_.isPlainObject(_.first(response.body.transcripts.records).collocations));
            });
        });

        it(`should contain a non-zero 'transcripts.records[N].collocations.count' integer`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(_.gt(_.first(response.body.transcripts.records).collocations.count, 0));
            });
        });

        it(`should contain a 'transcripts.records[N].collocations.records' array`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(_.isArray(_.first(response.body.transcripts.records).collocations.records));
            });
        });

        it(`should contain a 'transcripts.records[N].collocations.records[N].text' string with a length greater than 0`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                const text = _.first(_.first(response.body.transcripts.records).collocations.records).text;
                assert(_.isString(text));
                assert(_.gt(text.length, 0));
            });
        });

        it(`should contain a 'transcripts.records[N].collocations.records[N].description' string with a length greater than 0`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                const description = _.first(_.first(response.body.transcripts.records).collocations.records).description;
                assert(_.isString(description));
                assert(_.gt(description.length, 0));
            });
        });

        it(`should contain a 'transcripts.records[N].collocations.records[N].ipa_spelling' string with a length greater than 0`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                const ipaSpelling = _.first(_.first(response.body.transcripts.records).collocations.records).ipa_spelling;
                assert(_.isString(ipaSpelling));
                assert(_.gt(ipaSpelling.length, 0));
            });
        });

        it(`should contain a 'transcripts.records[N].collocations.records[N].usage_examples' object`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(_.isPlainObject(_.first(_.first(response.body.transcripts.records).collocations.records).usage_examples));
            });
        });

        it(`should contain a non-zero 'transcripts.records[N].collocations.records[N].usage_examples.count' integer`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(_.gt(_.first(_.first(response.body.transcripts.records).collocations.records).usage_examples.count, 0));
            });
        });

        it(`should contain a 'transcripts.records[N].collocations.records[N].usage_examples.count' array`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                assert(_.isArray(_.first(_.first(response.body.transcripts.records).collocations.records).usage_examples.records));
            });
        });

        it(`should contain a 'transcripts.records[N].collocations.records[N].usage_examples[N].text' string whose length is greater than 0`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                const text = _.first(_.first(_.first(response.body.transcripts.records).collocations.records).usage_examples.records).text;
                assert(_.isString(text));
                assert(_.gt(text.length, 0));
            });
        });

        it(`should instantiate a new study_sessions record`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                db.StudySession.findOne({
                    where: {
                        account_id: account.id,
                        video_id: reqBody.video_id
                    }
                }).then(function(studySession) {
                    assert(studySession);
                });
            });
        });

        it(`should instantiate a new queued video record linking the current account and video being studied`, function() {
            return request(server).post('/study').set('authorization', authorization).send(reqBody).then(function(response) {
                db.CuedVideo.findOne({
                    where: {
                        account_id: account.id,
                        video_id: reqBody.video_id
                    }
                }).then(function(queuedVideo) {
                    assert(queuedVideo);
                });
            });
        });
    });
});
