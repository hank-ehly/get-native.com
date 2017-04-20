/**
 * get-native-error.spec
 * get-native.com
 *
 * Created by henryehly on 2017/04/02.
 */

const GetNativeError = require('../../app/services').GetNativeError;

const assert         = require('assert');
const _              = require('lodash');

describe('GetNativeError', function() {
    before(function() {
        require('../../config/i18n');
    });

    it(`should return an object with a 'message' string property`, function() {
        assert(_.isString(new GetNativeError(100).message));
    });

    it(`should return an object with a 'code' number property`, function() {
        assert(_.isNumber(new GetNativeError(100).code));
    });

    it(`should not have an empty message`, function() {
        assert.notEqual(new GetNativeError(100).message, '');
    });

    it(`should throw a ReferenceError if no code is provided`, function() {
        assert.throws(function() {
            new GetNativeError()
        }, ReferenceError);
    });

    it(`should throw a TypeError if the code is not a number`, function() {
        assert.throws(function() {
            new GetNativeError('notANumber')
        }, TypeError);
    });

    it(`should not throw a ReferenceError if the code is unknown`, function() {
        assert.doesNotThrow(function() {
            new GetNativeError(99999)
        }, ReferenceError);
    });

    it(`should override the default message if a second optional message argument is provided`, function() {
        const overrideMessage = 'override';
        const error = new GetNativeError(100, overrideMessage);
        assert.equal(error.message, overrideMessage);
    });

    it(`should throw a TypeError of the default message is not a string`, function() {
        assert.throws(function() {
            new GetNativeError(100, {})
        }, TypeError);
    });
});
