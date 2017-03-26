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
                console.log(a.email);
                existingAccountEmail = a.email;
                done();
            });
        });
    });

    after(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAllUndo(), SpecUtil.stopMailServer()]);
    });

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
