/**
 * auth.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/27.
 */

const helpers    = require('../../app/helpers');
const AuthHelper = helpers.Auth;
const Utility    = helpers.Utility;

const assert     = require('assert');

describe('Auth', function() {
    describe('hashPassword', function() {
        it(`should throw a ReferenceError if there is no input`, function() {
            assert.throws(() => AuthHelper.hashPassword(), ReferenceError);
        });

        it(`should throw a TypeError if the input is not a string`, function() {
            assert.throws(() => AuthHelper.hashPassword({}), TypeError);
            assert.throws(() => AuthHelper.hashPassword(123), TypeError);
            assert.throws(() => AuthHelper.hashPassword(true), TypeError);
            assert.throws(() => AuthHelper.hashPassword([]), TypeError);
        });

        it(`should generate a hash not equal to the password`, function() {
            assert.notEqual(AuthHelper.hashPassword('password'), 'password');
        });

        it(`should return a string`, function() {
            assert.equal(Utility.typeof(AuthHelper.hashPassword('password')), 'string');
        });
    });

    describe('verifyPassword', function() {
        it(`should throw a ReferenceError if there are less than 2 arguments`, function() {
            assert.throws(() => AuthHelper.verifyPassword('password'), ReferenceError);
        });

        it(`should throw a TypeError if either one of the input arguments are not a string`, function() {
            assert.throws(() => AuthHelper.verifyPassword({}, 'password'), TypeError);
            assert.throws(() => AuthHelper.verifyPassword('password', 123), TypeError);
            assert.throws(() => AuthHelper.verifyPassword(true, 'password'), TypeError);
            assert.throws(() => AuthHelper.verifyPassword('password', []), TypeError);
        });

        it(`should return false if a library-specify error occurs`, function() {
            assert.equal(Utility.typeof(AuthHelper.verifyPassword('password', 'password')), 'boolean');
        });

        it(`should return true if the password is a match`, function() {
            let hash = AuthHelper.hashPassword('password');
            assert(AuthHelper.verifyPassword(hash, 'password'));
        });

        it(`should return false if the password is not a match`, function() {
            let hash = AuthHelper.hashPassword('password');
            assert(!AuthHelper.verifyPassword(hash, '_password'));
        });
    });
});
