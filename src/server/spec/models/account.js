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

    describe('calculateStudySessionStatsForLanguage', function() {
        it(`should throw a ReferenceError if no 'lang' is provided`, function() {
            assert.throws(() => account.calculateStudySessionStatsForLanguage(), ReferenceError);
        });

        it(`should throw a TypeError if the 'lang' argument is not a valid lang code`, function() {
            assert.throws(() => account.calculateStudySessionStatsForLanguage('invalid'), TypeError);
        });

        it(`should return the total study time for the specified language`, function() {
            const englishStudyTime      = 300;
            const japaneseStudyTime     = 420;
            const numberOfStudySessions = 5;

            const englishVideoPromise = Video.findOne({
                attributes: ['id'],
                where: {language_code: 'en'}
            });

            const japaneseVideoPromise = Video.findOne({
                attributes: ['id'],
                where: {language_code: 'ja'}
            });

            return Promise.all([englishVideoPromise, japaneseVideoPromise]).spread(function(englishVideo, japaneseVideo) {
                const englishStudySessionObject = _.constant({
                    video_id: englishVideo.id,
                    account_id: account.id,
                    study_time: englishStudyTime
                });

                const japaneseStudySessionObject = _.constant({
                    video_id: japaneseVideo.id,
                    account_id: account.id,
                    study_time: japaneseStudyTime
                });

                const createEnglishStudySessions  = StudySession.bulkCreate(_.times(numberOfStudySessions, englishStudySessionObject));
                const createJapaneseStudySessions = StudySession.bulkCreate(_.times(numberOfStudySessions, japaneseStudySessionObject));

                return Promise.all([createEnglishStudySessions, createJapaneseStudySessions]);
            }).then(function() {
                return account.calculateStudySessionStatsForLanguage('en');
            }).then(function(stats) {
                assert.equal(stats.total_time_studied, englishStudyTime * numberOfStudySessions);
            });
        });

        it(`should return 0 if the user has not studied before`, function() {
            return account.calculateStudySessionStatsForLanguage('en').then(function(stats) {
                assert.equal(stats.total_time_studied, 0);
            });
        });

        it(`should return the total number of study sessions for the specified language only`, function() {
            const englishStudyTime              = 300;
            const japaneseStudyTime             = 420;
            const numberOfEnglishStudySessions  = 5;
            const numberOfJapaneseStudySessions = 7;

            const englishVideoPromise = Video.findOne({
                attributes: ['id'],
                where: {language_code: 'en'}
            });

            const japaneseVideoPromise = Video.findOne({
                attributes: ['id'],
                where: {language_code: 'ja'}
            });

            return Promise.all([englishVideoPromise, japaneseVideoPromise]).spread(function(englishVideo, japaneseVideo) {
                const englishStudySessionObject = _.constant({
                    video_id: englishVideo.id,
                    account_id: account.id,
                    study_time: englishStudyTime
                });

                const japaneseStudySessionObject = _.constant({
                    video_id: japaneseVideo.id,
                    account_id: account.id,
                    study_time: japaneseStudyTime
                });

                const createEnglishStudySessions  = StudySession.bulkCreate(_.times(numberOfEnglishStudySessions, englishStudySessionObject));
                const createJapaneseStudySessions = StudySession.bulkCreate(_.times(numberOfJapaneseStudySessions, japaneseStudySessionObject));

                return Promise.all([createEnglishStudySessions, createJapaneseStudySessions]);
            }).then(function() {
                return account.calculateStudySessionStatsForLanguage('ja');
            }).then(function(stats) {
                assert.equal(stats.total_study_sessions, numberOfJapaneseStudySessions);
            });
        });

        it(`should return 0 if the user has not studied before`, function() {
            return account.calculateStudySessionStatsForLanguage('ja').then(function(stats) {
                assert.equal(stats.total_study_sessions, 0);
            });
        });
    });

    describe('calculateWritingStatsForLanguage', function() {
        it(`should throw a ReferenceError if no 'lang' is provided`, function() {
            assert.throws(() => account.calculateWritingStatsForLanguage(), ReferenceError);
        });

        it(`should throw a TypeError if the 'lang' argument is not a valid lang code`, function() {
            assert.throws(() => account.calculateWritingStatsForLanguage('invalid'), TypeError);
        });

        it(`should return the maximum number of words the user has written in a single study session for the specified language`, function() {
            const studyTime             = 300;
            const numberOfStudySessions = 2;

            const englishVideoPromise  = Video.findOne({attributes: ['id'], where: {language_code: 'en'}});
            const japaneseVideoPromise = Video.findOne({attributes: ['id'], where: {language_code: 'ja'}});

            return Promise.all([englishVideoPromise, japaneseVideoPromise]).spread(function(englishVideo, japaneseVideo) {
                const studySessionObject = {
                    account_id: account.id,
                    study_time: studyTime
                };

                const englishStudySessionObject  = _.constant(_.assign(_.clone(studySessionObject), {video_id: englishVideo.id}));
                const japaneseStudySessionObject = _.constant(_.assign(_.clone(studySessionObject), {video_id: japaneseVideo.id}));

                const createEnglishStudySessions  = StudySession.bulkCreate(_.times(numberOfStudySessions, englishStudySessionObject));
                const createJapaneseStudySessions = StudySession.bulkCreate(_.times(numberOfStudySessions, japaneseStudySessionObject));

                return Promise.all([createEnglishStudySessions, createJapaneseStudySessions, WritingQuestion.findOne()]);
            }).spread(function(englishStudySessions, japaneseStudySessions, writingQuestion) {
                const writingQuestionId = writingQuestion.get('id');
                const word = _.constant('word ');

                const englishAnswer_1 = {
                    answer: _.times(100, word).join(''),
                    study_session_id: _.first(englishStudySessions).get('id'),
                    words_per_minute: 20,
                    word_count: 100,
                    writing_question_id: writingQuestionId
                };

                const englishAnswer_2 = _.assign(_.clone(englishAnswer_1), {
                    answer: _.times(200, word).join(''),
                    study_session_id: _.nth(englishStudySessions, 1).get('id'),
                    words_per_minute: 40,
                    word_count: 200
                });

                const japaneseAnswer_1 = {
                    answer: _.times(300, word).join(''),
                    study_session_id: _.first(japaneseStudySessions).get('id'),
                    words_per_minute: 60,
                    word_count: 300,
                    writing_question_id: writingQuestionId
                };

                const japaneseAnswer_2 = _.assign(_.clone(japaneseAnswer_1), {
                    answer: _.times(400, word).join(''),
                    study_session_id: _.nth(japaneseStudySessions, 1).get('id'),
                    words_per_minute: 80,
                    word_count: 400
                });

                return WritingAnswer.bulkCreate([
                    englishAnswer_1, englishAnswer_2, japaneseAnswer_1, japaneseAnswer_2
                ]);
            }).then(function() {
                return account.calculateWritingStatsForLanguage('en');
            }).then(function(stats) {
                assert.equal(stats.maximum_words, 200);
            });
        });

        it(`should return the WPM of the writing answer in the specified language with the most words for the user`, function() {
            const englishVideoPromise = Video.findOne({
                attributes: ['id'],
                where: {language_code: 'en'}
            });

            const japaneseVideoPromise = Video.findOne({
                attributes: ['id'],
                where: {language_code: 'ja'}
            });

            return Promise.all([englishVideoPromise, japaneseVideoPromise]).spread(function(englishVideo, japaneseVideo) {
                const studySessionObject = {
                    account_id: account.id,
                    study_time: 300
                };

                const englishStudySessionObject  = _.constant(_.assign(_.clone(studySessionObject), {video_id: englishVideo.id}));
                const japaneseStudySessionObject = _.constant(_.assign(_.clone(studySessionObject), {video_id: japaneseVideo.id}));

                const createEnglishStudySessions  = StudySession.bulkCreate(_.times(2, englishStudySessionObject));
                const createJapaneseStudySessions = StudySession.bulkCreate(_.times(2, japaneseStudySessionObject));

                return Promise.all([createEnglishStudySessions, createJapaneseStudySessions, WritingQuestion.findOne()]);
            }).spread(function(englishStudySessions, japaneseStudySessions, writingQuestion) {
                const writingQuestionId = writingQuestion.get('id');
                const word = _.constant('word ');

                const englishAnswer_1 = {
                    answer: _.times(100, word).join(''),
                    study_session_id: _.first(englishStudySessions).get('id'),
                    words_per_minute: 20,
                    word_count: 100,
                    writing_question_id: writingQuestionId
                };

                const englishAnswer_2 = _.assign(_.clone(englishAnswer_1), {
                    answer: _.times(200, word).join(''),
                    study_session_id: _.nth(englishStudySessions, 1).get('id'),
                    words_per_minute: 40,
                    word_count: 200
                });

                const japaneseAnswer_1 = {
                    answer: _.times(300, word).join(''),
                    study_session_id: _.first(japaneseStudySessions).get('id'),
                    words_per_minute: 60,
                    word_count: 300,
                    writing_question_id: writingQuestionId
                };

                const japaneseAnswer_2 = _.assign(_.clone(japaneseAnswer_1), {
                    answer: _.times(400, word).join(''),
                    study_session_id: _.nth(japaneseStudySessions, 1).get('id'),
                    words_per_minute: 80,
                    word_count: 400
                });

                return WritingAnswer.bulkCreate([englishAnswer_1, englishAnswer_2, japaneseAnswer_1, japaneseAnswer_2]);
            }).then(function() {
                return account.calculateWritingStatsForLanguage('en');
            }).then(function(stats) {
                assert.equal(stats.maximum_wpm, 40);
            });
        });

        it(`should return 0 WPM if the user has not studied before`, function() {
            return account.calculateWritingStatsForLanguage('en').then(function(stats) {
                assert.equal(stats.maximum_wpm, 0);
            });
        });

        it(`should return 0 as the maximum number of words if the user has not studied before`, function() {
            return account.calculateWritingStatsForLanguage('en').then(function(stats) {
                assert.equal(stats.maximum_words, 0);
            });
        });
    });

    describe('calculateStudyStreaks', function() {
        it(`should throw a ReferenceError if no 'lang' is provided`, function() {
            assert.throws(() => account.calculateStudyStreaksForLanguage(), ReferenceError);
        });

        it(`should throw a TypeError if the 'lang' argument is not a valid lang code`, function() {
            assert.throws(() => account.calculateStudyStreaksForLanguage('invalid'), TypeError);
        });

        it(`should return the longest number of consecutive days the user has studied for the specified language`, function() {
            const japaneseVideoPromise = Video.findOne({attributes: ['id'], where: {language_code: 'ja'}});
            const englishVideoPromise  = Video.findOne({attributes: ['id'], where: {language_code: 'en'}});

            return Promise.all([japaneseVideoPromise, englishVideoPromise]).spread(function(japaneseVideo, englishVideo) {
                const englishStudyDates = [
                    '2017-03-13 00:00:00',
                    '2017-03-10 00:00:00',
                    '2017-03-09 00:00:00',
                    '2017-03-08 00:00:00',
                    '2017-03-07 00:00:00',
                    '2017-03-05 00:00:00',
                    '2017-03-02 00:00:00',
                    '2017-03-01 00:00:00'
                ];

                const japaneseStudyDates = [
                    '2017-03-08 00:00:00',
                    '2017-03-07 00:00:00',
                    '2017-03-06 00:00:00',
                    '2017-03-05 00:00:00',
                    '2017-03-04 00:00:00',
                    '2017-03-03 00:00:00',
                    '2017-03-02 00:00:00',
                    '2017-03-01 00:00:00'
                ];

                const englishStudySessions = _.times(englishStudyDates.length, function(i) {
                    return {
                        video_id: englishVideo.id,
                        account_id: account.id,
                        study_time: 300,
                        created_at: englishStudyDates[i],
                        updated_at: englishStudyDates[i]
                    }
                });

                const japaneseStudySessions = _.times(japaneseStudyDates.length, function(i) {
                    return {
                        video_id: japaneseVideo.id,
                        account_id: account.id,
                        study_time: 300,
                        created_at: japaneseStudyDates[i],
                        updated_at: japaneseStudyDates[i]
                    }
                });

                return StudySession.bulkCreate(_.concat(englishStudySessions, japaneseStudySessions));
            }).then(function() {
                return Promise.all([account.calculateStudyStreaksForLanguage('en'), account.calculateStudyStreaksForLanguage('ja')]);
            }).spread(function(englishStats, japaneseStats) {
                assert.equal(englishStats.longest_consecutive_days, 4, '(English)');
                assert.equal(japaneseStats.longest_consecutive_days, 8, '(Japanese)');
            });
        });

        it(`should return the number of days the user has consecutively studied for the specified language`, function() {
            const japaneseVideoPromise = Video.findOne({attributes: ['id'], where: {language_code: 'ja'}});
            const englishVideoPromise  = Video.findOne({attributes: ['id'], where: {language_code: 'en'}});

            return Promise.all([japaneseVideoPromise, englishVideoPromise]).spread(function(japaneseVideo, englishVideo) {
                const oneDay             = 1000 * 60 * 60 * 24;
                const now                = new Date();
                const yesterday          = new Date(now - oneDay);
                const dayBeforeYesterday = new Date(now - (oneDay * 2));

                const englishStudyDates = [
                    now, yesterday, dayBeforeYesterday, '2017-03-05 00:00:00', '2017-03-02 00:00:00', '2017-03-01 00:00:00'
                ];

                const japaneseStudyDates = [
                    now, '2017-03-05 00:00:00', '2017-03-02 00:00:00', '2017-03-01 00:00:00'
                ];

                const englishStudySessions = _.times(englishStudyDates.length, function(i) {
                    return {
                        video_id: englishVideo.id,
                        account_id: account.id,
                        study_time: 300,
                        created_at: englishStudyDates[i],
                        updated_at: englishStudyDates[i]
                    }
                });

                const japaneseStudySessions = _.times(japaneseStudyDates.length, function(i) {
                    return {
                        video_id: japaneseVideo.id,
                        account_id: account.id,
                        study_time: 300,
                        created_at: japaneseStudyDates[i],
                        updated_at: japaneseStudyDates[i]
                    }
                });

                return StudySession.bulkCreate(_.concat(englishStudySessions, japaneseStudySessions));
            }).then(function() {
                return Promise.all([account.calculateStudyStreaksForLanguage('en'), account.calculateStudyStreaksForLanguage('ja')]);
            }).spread(function(englishStats, japaneseStats) {
                assert.equal(englishStats.consecutive_days, 3, '(English)');
                assert.equal(japaneseStats.consecutive_days, 1, '(Japanese)');
            });
        });

        it(`should return 0 as the current streak if the user has not studied before`, function() {
            return account.calculateStudyStreaksForLanguage('en').then(function(stats) {
                assert.equal(stats.consecutive_days, 0);
            });
        });

        it(`should return 0 as the longest streak if the user has not studied before`, function() {
            return account.calculateStudyStreaksForLanguage('en').then(function(stats) {
                assert.equal(stats.longest_consecutive_days, 0);
            });
        });
    });
});
