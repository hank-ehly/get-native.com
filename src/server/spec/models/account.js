/**
 * account
 * get-native.com
 *
 * Created by henryehly on 2017/03/26.
 */

const assert          = require('assert');
const SpecUtil        = require('../spec-util');
const Promise         = require('bluebird');
const db              = require('../../app/models');
const _               = require('lodash');
const Account         = db.Account;
const Video           = db.Video;
const WritingAnswer   = db.WritingAnswer;
const WritingQuestion = db.WritingQuestion;
const StudySession    = db.StudySession;

describe('Account', function() {
    const credentials = {email: '', password: '12345678'};
    let account       = null;

    before(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAll(), SpecUtil.startMailServer()]);
    });

    beforeEach(function() {
        this.timeout(SpecUtil.defaultTimeout);
        credentials.email = 'test-' + Math.floor(Math.random() * 10000000) + '@email.com';
        return Account.create(credentials).then(function(_) {
            account = _;
        });
    });

    after(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAllUndo(), SpecUtil.stopMailServer()]);
    });

    describe('existsForEmail', function() {
        it(`should return true if a user exists for a given email address`, function() {
            return Account.existsForEmail(account.email).then(assert);
        });

        it(`should return false if a user does not exist for a given email address`, function() {
            return Account.existsForEmail('nonexistent@email.com').then(function(exists) {
                assert(!exists);
            });
        });

        it(`should throw a TypeError if the first argument is not an email address`, function() {
            assert.throws(function() {
                Account.existsForEmail(123)
            }, TypeError);
        });
    });

    describe('calculateStudySessionStats', function() {
        it(`should return the total study time for this user`, function() {
            const studyTime             = 300;
            const numberOfStudySessions = 5;

            return Video.findOne({attributes: ['id']}).then(function(video) {
                const studySessionObject = _.constant({
                    video_id: video.id,
                    account_id: account.id,
                    study_time: studyTime
                });

                return StudySession.bulkCreate(_.times(numberOfStudySessions, studySessionObject))
            }).then(function() {
                return account.calculateStudySessionStats();
            }).then(function(stats) {
                assert.equal(stats.total_time_studied, studyTime * numberOfStudySessions);
            });
        });

        it(`should return 0 if the user has not studied before`, function() {
            account.calculateStudySessionStats().then(function(stats) {
                assert.equal(stats.total_time_studied, 0);
            });
        });

        it(`should return the total number of study sessions linked to the user`, function() {
            const numberOfStudySessions = 40;

            return Video.findOne({attributes: ['id']}).then(function(video) {
                const studySessionObject = _.constant({
                    video_id: video.id,
                    account_id: account.id,
                    study_time: 300
                });

                return StudySession.bulkCreate(_.times(numberOfStudySessions, studySessionObject))
            }).then(function() {
                return account.calculateStudySessionStats();
            }).then(function(stats) {
                assert.equal(stats.total_study_sessions, numberOfStudySessions);
            });
        });

        it(`should return 0 if the user has not studied before`, function() {
            return account.calculateStudySessionStats().then(function(stats) {
                assert.equal(stats.total_study_sessions, 0);
            });
        });
    });

    describe('calculateWritingStats', function() {
        it(`should return the maximum number of words the user has written in a single study session`, function() {
            return Video.findOne({attributes: ['id']}).then(function(video) {
                const studySessionObject = {
                    video_id: video.id,
                    account_id: account.id,
                    study_time: 300
                };

                return Promise.all([StudySession.create(studySessionObject), WritingQuestion.findOne()]);
            }).spread(function(studySession, writingQuestion) {
                const one_hundred_words = _.times(100, _.constant('word ')).join('');
                const two_hundred_words = _.times(200, _.constant('word ')).join('');

                return WritingAnswer.bulkCreate([
                    {
                        answer: one_hundred_words,
                        words_per_minute: 20,
                        word_count: 100,
                        study_session_id: studySession.get('id'),
                        writing_question_id: writingQuestion.get('id')
                    },
                    {
                        answer: two_hundred_words,
                        words_per_minute: 40,
                        word_count: 200,
                        study_session_id: studySession.get('id'),
                        writing_question_id: writingQuestion.get('id')
                    }
                ]);
            }).then(function() {
                return account.calculateWritingStats();
            }).then(function(stats) {
                assert.equal(stats.maximum_words, 200);
            });
        });

        it(`should return the WPM of the writing answer with the most words for the user`, function() {
            return Video.findOne({attributes: ['id']}).then(function(video) {
                const studySessionObject = {
                    video_id: video.id,
                    account_id: account.id,
                    study_time: 300
                };

                return Promise.all([StudySession.create(studySessionObject), WritingQuestion.findOne()]);
            }).spread(function(studySession, writingQuestion) {
                const one_hundred_words = _.times(100, _.constant('word ')).join('');
                const two_hundred_words = _.times(200, _.constant('word ')).join('');

                return db.WritingAnswer.bulkCreate([
                    {
                        answer: one_hundred_words,
                        words_per_minute: 20,
                        word_count: 100,
                        study_session_id: studySession.get('id'),
                        writing_question_id: writingQuestion.get('id')
                    },
                    {
                        answer: two_hundred_words,
                        words_per_minute: 40,
                        word_count: 200,
                        study_session_id: studySession.get('id'),
                        writing_question_id: writingQuestion.get('id')
                    }
                ]);
            }).then(function() {
                return account.calculateWritingStats();
            }).then(function(stats) {
                assert.equal(stats.maximum_wpm, 40);
            });
        });

        it(`should return 0 WPM if the user has not studied before`, function() {
            return account.calculateWritingStats().then(function(stats) {
                assert.equal(stats.maximum_wpm, 0);
            });
        });

        it(`should return 0 as the maximum number of words if the user has not studied before`, function() {
            return account.calculateWritingStats().then(function(stats) {
                assert.equal(stats.maximum_words, 0);
            });
        });
    });

    describe('calculateStudyStreaks', function() {
        it(`should return the longest number of consecutive days (4 days) the user has studied`, function() {
            return Video.findOne({attributes: ['id']}).then(function(video) {
                const studyDates = [
                    '2017-03-13 00:00:00',
                    '2017-03-10 00:00:00',
                    '2017-03-09 00:00:00',
                    '2017-03-08 00:00:00',
                    '2017-03-07 00:00:00',
                    '2017-03-05 00:00:00',
                    '2017-03-02 00:00:00',
                    '2017-03-01 00:00:00'
                ];

                const studySessionObjects = _.times(studyDates.length, function(i) {
                    return {
                        video_id: video.id,
                        account_id: account.id,
                        study_time: 300,
                        created_at: studyDates[i],
                        updated_at: studyDates[i]
                    }
                });

                return StudySession.bulkCreate(studySessionObjects);
            }).then(function() {
                return account.calculateStudyStreaks();
            }).then(function(stats) {
                assert.equal(stats.longest_consecutive_days, 4);
            });
        });

        it(`should return the number of days (3) the user has consecutively studied`, function() {
            return Video.findOne({attributes: ['id']}).then(function(video) {
                const oneDay             = 1000 * 60 * 60 * 24;
                const now                = new Date();
                const yesterday          = new Date(now - oneDay);
                const dayBeforeYesterday = new Date(now - (oneDay * 2));
                const studyDates         = [
                    now, yesterday, dayBeforeYesterday, '2017-03-05 00:00:00', '2017-03-02 00:00:00', '2017-03-01 00:00:00'
                ];

                const studySessionObjects = _.times(studyDates.length, function(i) {
                    return {
                        video_id: video.id,
                        account_id: account.id,
                        study_time: 300,
                        created_at: studyDates[i],
                        updated_at: studyDates[i]
                    }
                });

                return StudySession.bulkCreate(studySessionObjects);
            }).then(function() {
                return account.calculateStudyStreaks();
            }).then(function(stats) {
                assert.equal(stats.consecutive_days, 3);
            });
        });

        it(`should return 0 as the current streak if the user has not studied before`, function() {
            return account.calculateStudyStreaks().then(function(stats) {
                assert.equal(stats.consecutive_days, 0);
            });
        });

        it(`should return 0 as the longest streak if the user has not studied before`, function() {
            return account.calculateStudyStreaks().then(function(stats) {
                assert.equal(stats.longest_consecutive_days, 0);
            });
        });
    });
});
