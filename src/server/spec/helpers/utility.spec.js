/**
 * utility
 * get-native.com
 *
 * Created by henryehly on 2017/03/14.
 */

const util = require('../../app/helpers').Utility;
const assert = require('assert');

describe('utility', () => {

    describe('typeof', () => {
        it(`should return 'string' if passed a string`, () => {
            assert.equal(util.typeof('hello world'), 'string');
        });

        it(`should return 'boolean' if passed a boolean`, () => {
            assert.equal(util.typeof(false), 'boolean');
        });

        it(`should return 'array' if passed a array`, () => {
            assert.equal(util.typeof([1, 2, 3]), 'array');
        });

        it(`should return 'object' if passed a object`, () => {
            assert.equal(util.typeof({foo: 'bar'}), 'object');
        });

        it(`should return 'number' if passed a number`, () => {
            assert.equal(util.typeof(90), 'number');
        });

        it(`should return 'function' if passed a function`, () => {
            assert.equal(util.typeof(function() {
            }), 'function');
        });
    });

    describe('extractAuthTokenFromRequest', () => {
        it('should throw a RangeError if the number of arguments is less than 1', () => {
            assert.throws(() => util.extractAuthTokenFromRequest(), RangeError);
        });

        it('should throw a RangeError if the number of arguments is greater than 1', () => {
            assert.throws(() => util.extractAuthTokenFromRequest({}, {}), RangeError);
        });

        it(`should throw a TypeError if the first argument does not have a 'headers' property of object type`, () => {
            assert.throws(() => util.extractAuthTokenFromRequest({foo: 'bar'}), TypeError);
        });

        it(`should throw a ReferenceError if the request object does not have an 'authorization' property of string type`, () => {
            assert.throws(() => util.extractAuthTokenFromRequest({headers: {foo: 'bar'}}), ReferenceError);
        });

        it(`should throw a SyntaxError if the requests' 'authorization' header field value is not correctly formatted`, () => {
            assert.throws(() => util.extractAuthTokenFromRequest({headers: {authorization: ''}}), SyntaxError);
        });

        it('should return a string', () => {
            let retVal = util.extractAuthTokenFromRequest({headers: {authorization: 'Bearer XXX.XXX.XXX'}});
            let typeOfRetVal = util.typeof(retVal);
            assert.equal('string', typeOfRetVal);
        });

        it('should return a string whose length is greater than 0', () => {
            let retVal = util.extractAuthTokenFromRequest({headers: {authorization: 'Bearer XXX.XXX.XXX'}});
            assert(retVal.length > 0);
        });
    });

    describe('browserTimezoneOffsetToSQLFormat', () => {
        it(`should return the timezone offset as '+09:00' provided a value in minutes as '-540'`, function() {
            assert.equal(util.browserTimezoneOffsetToSQLFormat('-540'), '+09:00');
        });

        it(`should return the timezone offset as '-03:30' provided a value in minutes as '210'`, function() {
            assert.equal(util.browserTimezoneOffsetToSQLFormat('210'), '-03:30');
        });

        it(`should return the timezone offset as '+00:00' provided a value in minutes as '0'`, function() {
            assert.equal(util.browserTimezoneOffsetToSQLFormat('0'), '+00:00');
        });

        it(`should return the timezone offset as '+08:45' provided a value in minutes as '-525'`, function() {
            assert.equal(util.browserTimezoneOffsetToSQLFormat('-525'), '+08:45');
        });
    });
});
