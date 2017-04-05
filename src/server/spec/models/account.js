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

describe('Account', function() {
    let existingAccountEmail      = null;
    const nonExistentAccountEmail = 'nonexistent@email.com';

    before(function(done) {
        this.timeout(SpecUtil.defaultTimeout);
        Promise.all([SpecUtil.seedAll(), SpecUtil.startMailServer()]).then(() => {
            Account.findOne().then(a => {
                existingAccountEmail = a.email;
                done();
            });
        });
    });

    after(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAllUndo(), SpecUtil.stopMailServer()]);
    });

    describe('existsForEmail', function() {
        it(`should return true if a user exists for a given email address`, function() {
            return Account.existsForEmail(existingAccountEmail).then(exists => {
                assert(exists);
            });
        });

        it(`should return false if a user does not exist for a given email address`, function() {
            return Account.existsForEmail(nonExistentAccountEmail).then(exists => {
                assert(!exists);
            });
        });

        it(`should throw a TypeError if the first argument is not an email address`, function() {
            assert.throws(() => Account.existsForEmail(123), TypeError);
        });
    });

    describe('totalTimeStudied', function() {
        it(`should return the total study time for this user`);
        it(`should return 0 if the user has not studied before`);
    });

    describe('consecutiveStudyDays', function() {
        it(`should return the number of days the user has consecutively studied`);
        it(`should return 0 if the user has not studied before`);
        it(`should be less than or equal to the result of longestConsecutiveStudyDays`);
    });

    describe('totalStudySessions', function() {
        it(`should return the total number of study sessions linked to the user`);
        it(`should return 0 if the user has not studied before`);
    });

    describe('longestConsecutiveStudyDays', function() {
        it(`should return the longest number of consecutive days the user has studied`);
        it(`should be equal to or greater than the result of consecutiveStudyDays`);
    });

    describe('maximumWords', function() {
        it(`should return the maximum number of words the user has written in a single study session`);
    });

    describe('maximumWPM', function() {
        it(`should return the WPM of the writing answer with the most words for the user`);
    });
});
