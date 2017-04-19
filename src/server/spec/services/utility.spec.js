/**
 * utility.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/14.
 */

const Utility = require('../../app/services').Utility;
const assert = require('assert');

describe('Utility', function() {

    describe('typeof', () => {
        it(`should return 'string' if passed a string`, () => {
            assert.equal(Utility.typeof('hello world'), 'string');
        });

        it(`should return 'boolean' if passed a boolean`, () => {
            assert.equal(Utility.typeof(false), 'boolean');
        });

        it(`should return 'array' if passed a array`, () => {
            assert.equal(Utility.typeof([1, 2, 3]), 'array');
        });

        it(`should return 'object' if passed a object`, () => {
            assert.equal(Utility.typeof({foo: 'bar'}), 'object');
        });

        it(`should return 'number' if passed a number`, () => {
            assert.equal(Utility.typeof(90), 'number');
        });

        it(`should return 'function' if passed a function`, () => {
            assert.equal(Utility.typeof(function() {
            }), 'function');
        });
    });

    describe('extractAuthTokenFromRequest', () => {
        it('should throw a RangeError if the number of arguments is less than 1', () => {
            assert.throws(() => Utility.extractAuthTokenFromRequest(), RangeError);
        });

        it('should throw a RangeError if the number of arguments is greater than 1', () => {
            assert.throws(() => Utility.extractAuthTokenFromRequest({}, {}), RangeError);
        });

        it(`should throw a TypeError if the first argument does not have a 'headers' property of object type`, () => {
            assert.throws(() => Utility.extractAuthTokenFromRequest({foo: 'bar'}), TypeError);
        });

        it(`should throw a ReferenceError if the request object does not have an 'authorization' property of string type`, () => {
            assert.throws(() => Utility.extractAuthTokenFromRequest({headers: {foo: 'bar'}}), ReferenceError);
        });

        it(`should throw a SyntaxError if the requests' 'authorization' header field value is not correctly formatted`, () => {
            assert.throws(() => Utility.extractAuthTokenFromRequest({headers: {authorization: ''}}), SyntaxError);
        });

        it('should return a string', () => {
            let retVal = Utility.extractAuthTokenFromRequest({headers: {authorization: 'Bearer XXX.XXX.XXX'}});
            let typeOfRetVal = Utility.typeof(retVal);
            assert.equal('string', typeOfRetVal);
        });

        it('should return a string whose length is greater than 0', () => {
            let retVal = Utility.extractAuthTokenFromRequest({headers: {authorization: 'Bearer XXX.XXX.XXX'}});
            assert(retVal.length > 0);
        });
    });

    describe('browserTimezoneOffsetToSQLFormat', () => {
        it(`should return the timezone offset as '+09:00' provided a value in minutes as '-540'`, function() {
            assert.equal(Utility.browserTimezoneOffsetToSQLFormat('-540'), '+09:00');
        });

        it(`should return the timezone offset as '-03:30' provided a value in minutes as '210'`, function() {
            assert.equal(Utility.browserTimezoneOffsetToSQLFormat('210'), '-03:30');
        });

        it(`should return the timezone offset as '+00:00' provided a value in minutes as '0'`, function() {
            assert.equal(Utility.browserTimezoneOffsetToSQLFormat('0'), '+00:00');
        });

        it(`should return the timezone offset as '+08:45' provided a value in minutes as '-525'`, function() {
            assert.equal(Utility.browserTimezoneOffsetToSQLFormat('-525'), '+08:45');
        });

        it(`should return the timezone offset as '+00:00' if no value is provided`, function() {
            assert.equal(Utility.browserTimezoneOffsetToSQLFormat(null), '+00:00');
        });
    });
});
