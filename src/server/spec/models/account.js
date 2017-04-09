/**
 * account
 * get-native.com
 *
 * Created by henryehly on 2017/03/26.
 */

const assert   = require('assert');
const SpecUtil = require('../spec-util');
const Account  = require('../../app/models').Account;
const Promise  = require('bluebird');
const db       = require('../../app/models');
const _        = require('lodash');

describe('Account', function() {
    before(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAll(), SpecUtil.startMailServer()]);
    });

    after(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAllUndo(), SpecUtil.stopMailServer()]);
    });

    describe('existsForEmail', function() {
        it(`should return true if a user exists for a given email address`, function() {
            return Account.findOne().then(account => {
                return Account.existsForEmail(account.email);
            }).then(assert);
        });

        it(`should return false if a user does not exist for a given email address`, function() {
            return Account.existsForEmail('nonexistent@email.com').then(exists => {
                assert(!exists);
            });
        });

        it(`should throw a TypeError if the first argument is not an email address`, function() {
            assert.throws(() => Account.existsForEmail(123), TypeError);
        });
    });

    describe('calculateStudySessionStats', function() {
        it(`should return the total study time for this user`, function() {
            let account = null;
            const studyTime = 300;

            return Account.create({email: 'user1@email.com', password: '12345678'}).then(function(_account) {
                account = _account;
                return db.Video.findOne({attributes: ['id']});
            }).then(function(video) {
                return Promise.all([
                    db.StudySession.create({video_id: video.id, account_id: account.id, study_time: studyTime}),
                    db.StudySession.create({video_id: video.id, account_id: account.id, study_time: studyTime})
                ]);
            }).then(function() {
                return account.calculateStudySessionStats();
            }).then(function(stats) {
                assert.equal(stats.total_time_studied, studyTime * 2);
            }).catch(function(e) {
                console.log(e);
                assert.fail();
            });
        });

        it(`should return 0 if the user has not studied before`, function() {
            const credentials = {email: 'user2@email.com', password: '12345678'};
            return Account.create(credentials).then(function(newAccount) {
                return newAccount.calculateStudySessionStats();
            }).then(function(stats) {
                assert.equal(stats.total_time_studied, 0);
            }).catch(function(e) {
                console.log(e);
                assert.fail();
            });
        });

        it(`should return the total number of study sessions linked to the user`, function() {
            let account = null;
            return Account.create({email: 'user3@email.com', password: '12345678'}).then(function(_account) {
                account = _account;
                return db.Video.findOne({attributes: ['id']});
            }).then(function(v) {
                return Promise.all([
                    db.StudySession.create({video_id: v.id, account_id: account.id, study_time: 300}),
                    db.StudySession.create({video_id: v.id, account_id: account.id, study_time: 300})
                ]);
            }).then(function() {
                return account.calculateStudySessionStats();
            }).then(function(stats) {
                assert.equal(stats.total_study_sessions, 2);
            }).catch(function(e) {
                console.log(e);
                assert.fail();
            });
        });

        it(`should return 0 if the user has not studied before`, function() {
            const credentials = {email: 'user4@email.com', password: '12345678'};
            return Account.create(credentials).then(function(newAccount) {
                return newAccount.calculateStudySessionStats();
            }).then(function(stats) {
                assert.equal(stats.total_study_sessions, 0);
            }).catch(function(e) {
                console.log(e);
                assert.fail();
            });
        });
    });

    describe('calculateWritingStats', function() {
        it(`should return the maximum number of words the user has written in a single study session`, function() {
            let account = null;
            let studySession = null;
            return Account.create({email: 'user5@email.com', password: '12345678'}).then(function(_account) {
                account = _account;
                return db.Video.findOne({attributes: ['id']});
            }).then(function(video) {
                return db.StudySession.create({video_id: video.id, account_id: account.id, study_time: 300});
            }).then(function(_studySession) {
                studySession = _studySession;
                return db.WritingQuestion.findOne();
            }).then(function(writingQuestion) {
                const one_hundred_words = _.times(100, _.constant('word ')).join('');
                const two_hundred_words = _.times(200, _.constant('word ')).join('');
                return db.WritingAnswer.bulkCreate([
                    {answer: one_hundred_words, words_per_minute: 20, word_count: 100, study_session_id: studySession.get('id'), writing_question_id: writingQuestion.get('id')},
                    {answer: two_hundred_words, words_per_minute: 40, word_count: 200, study_session_id: studySession.get('id'), writing_question_id: writingQuestion.get('id')}
                ]);
            }).then(function() {
                return account.calculateWritingStats();
            }).then(function(stats) {
                assert.equal(stats.maximum_words, 200);
            }).catch(function(e) {
                console.log(e);
                assert.fail();
            });
        });

        it(`should return the WPM of the writing answer with the most words for the user`, function() {
            let account = null;
            let studySession = null;
            return Account.create({email: 'user6@email.com', password: '12345678'}).then(function(_account) {
                account = _account;
                return db.Video.findOne({attributes: ['id']});
            }).then(function(video) {
                return db.StudySession.create({video_id: video.id, account_id: account.id, study_time: 300});
            }).then(function(_studySession) {
                studySession = _studySession;
                return db.WritingQuestion.findOne();
            }).then(function(writingQuestion) {
                const one_hundred_words = _.times(100, _.constant('word ')).join('');
                const two_hundred_words = _.times(200, _.constant('word ')).join('');
                return db.WritingAnswer.bulkCreate([
                    {answer: one_hundred_words, words_per_minute: 20, word_count: 100, study_session_id: studySession.get('id'), writing_question_id: writingQuestion.get('id')},
                    {answer: two_hundred_words, words_per_minute: 40, word_count: 200, study_session_id: studySession.get('id'), writing_question_id: writingQuestion.get('id')}
                ]);
            }).then(function() {
                return account.calculateWritingStats();
            }).then(function(stats) {
                assert.equal(stats.maximum_wpm, 40);
            }).catch(function(e) {
                console.log(e);
                assert.fail();
            });
        });

        it(`should return 0 WPM if the user has not studied before`, function() {
            return Account.create({email: 'user7@email.com', password: '12345678'}).then(function(newAccount) {
                return newAccount.calculateWritingStats();
            }).then(function(stats) {
                assert.equal(stats.maximum_wpm, 0);
            }).catch(function(e) {
                console.log(e);
                assert.fail();
            });
        });

        it(`should return 0 as the maximum number of words if the user has not studied before`, function() {
            return Account.create({email: 'user8@email.com', password: '12345678'}).then(function(newAccount) {
                return newAccount.calculateWritingStats();
            }).then(function(stats) {
                assert.equal(stats.maximum_words, 0);
            }).catch(function(e) {
                console.log(e);
                assert.fail();
            });
        });
    });

    describe('calculateStudyStreaks', function() {
        it(`should return the longest number of consecutive days (4 days) the user has studied`, function() {
            let account = null;
            return Account.create({email: 'user9@email.com', password: '12345678'}).then(function(newAccount) {
                account = newAccount;
                return db.Video.findOne({attributes: ['id']});
            }).then(function(video) {
                return db.StudySession.bulkCreate([
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: '2017-03-13 00:00:00', updated_at: '2017-03-13 00:00:00'},
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: '2017-03-10 00:00:00', updated_at: '2017-03-10 00:00:00'},
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: '2017-03-09 00:00:00', updated_at: '2017-03-09 00:00:00'},
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: '2017-03-08 00:00:00', updated_at: '2017-03-08 00:00:00'},
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: '2017-03-07 00:00:00', updated_at: '2017-03-07 00:00:00'},
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: '2017-03-05 00:00:00', updated_at: '2017-03-05 00:00:00'},
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: '2017-03-02 00:00:00', updated_at: '2017-03-02 00:00:00'},
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: '2017-03-01 00:00:00', updated_at: '2017-03-01 00:00:00'},
                ]);
            }).then(function() {
                return account.calculateStudyStreaks();
            }).then(function(stats) {
                assert.equal(stats.longest_consecutive_days, 4);
            });
        });

        it(`should return the number of days (3) the user has consecutively studied`, function() {
            let account = null;
            return Account.create({email: 'user10@email.com', password: '12345678'}).then(function(newAccount) {
                account = newAccount;
                return db.Video.findOne({attributes: ['id']});
            }).then(function(video) {
                let now = new Date();
                let aDay = 1000 * 60 * 60 * 24;
                let yesterday = new Date(now - aDay);
                let dayBeforeYesterday = new Date(now - (aDay * 2));
                return db.StudySession.bulkCreate([
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: now, updated_at: now},
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: yesterday, updated_at: yesterday},
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: dayBeforeYesterday, updated_at: dayBeforeYesterday},
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: '2017-03-05 00:00:00', updated_at: '2017-03-05 00:00:00'},
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: '2017-03-02 00:00:00', updated_at: '2017-03-02 00:00:00'},
                    {video_id: video.id, account_id: account.id, study_time: 300, created_at: '2017-03-01 00:00:00', updated_at: '2017-03-01 00:00:00'},
                ]);
            }).then(function() {
                return account.calculateStudyStreaks();
            }).then(function(stats) {
                assert.equal(stats.consecutive_days, 3);
            });
        });

        it(`should return 0 as the current streak if the user has not studied before`, function() {
            return Account.create({email: 'user11@email.com', password: '12345678'}).then(function(newAccount) {
                return newAccount.calculateStudyStreaks();
            }).then(function(stats) {
                assert.equal(stats.consecutive_days, 0);
            }).catch(function(e) {
                console.log(e);
                assert.fail();
            });
        });

        it(`should return 0 as the longest streak if the user has not studied before`, function() {
            return Account.create({email: 'user12@email.com', password: '12345678'}).then(function(newAccount) {
                return newAccount.calculateStudyStreaks();
            }).then(function(stats) {
                assert.equal(stats.longest_consecutive_days, 0);
            }).catch(function(e) {
                console.log(e);
                assert.fail();
            });
        });
    });
});
