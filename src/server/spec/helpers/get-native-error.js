/**
 * get-native-error.spec
 * get-native.com
 *
 * Created by henryehly on 2017/04/02.
 */

const assert = require('assert');
const GetNativeError = require('../../app/helpers').GetNativeError;
const Utility = require('../../app/helpers').Utility;
const _ = require('lodash');

describe('GetNativeError', function() {
    it(`should return an object with a 'message' string property`, function() {
        const error = new GetNativeError(100);
        assert(_.isString(error.message));
    });

    it(`should return an object with a 'code' number property`, function() {
        const error = new GetNativeError(100);
        assert(_.isNumber(error.code));
    });

    it(`should not have an empty message`, function() {
        const error = new GetNativeError(100);
        assert.notEqual(error.message, '');
    });

    it(`should throw a ReferenceError if no code is provided`, function() {
        assert.throws(() => new GetNativeError(), ReferenceError);
    });

    it(`should throw a TypeError if the code is not a number`, function() {
        assert.throws(() => new GetNativeError('notANumber'), TypeError);
    });

    it(`should throw a ReferenceError if the code is unknown`, function() {
        assert.throws(() => new GetNativeError(99999), ReferenceError);
    });

    it(`should override the default message if a second optional message argument is provided`, function() {
        const overrideMessage = 'override';
        const error = new GetNativeError(100, overrideMessage);
        assert.equal(error.message, overrideMessage);
    });

    it(`should throw a TypeError of the default message is not a string`, function() {
        assert.throws(() => new GetNativeError(100, {}), TypeError);
    });
});
