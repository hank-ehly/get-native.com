/**
 * get-native-error
 * get-native.com
 *
 * Created by henryehly on 2017/04/02.
 */

const Utility = require('./utility');

const i18n    = require('i18n');
const _       = require('lodash');

function GetNativeError(code, message) {
    Error.captureStackTrace(this, GetNativeError);

    if (!code) {
        throw new ReferenceError('No code provided');
    }

    if (!_.isNumber(code)) {
        throw new TypeError(`Code must be a number -- received ${Utility.typeof(code)}`);
    }

    if (message && !_.isString(message)) {
        throw new TypeError(`Message must be a string -- received ${Utility.typeof(code)}`);
    }

    else if (!message && !i18n.__(`errors.${code}`)) {
        throw new ReferenceError(`No message provided for error code ${code}`);
    }

    this.message = message || i18n.__(`errors.${code}`);
    this.code    = code;
}

GetNativeError.prototype = Object.create(Error.prototype);

module.exports = GetNativeError;
