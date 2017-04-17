/**
 * auth
 * get-native.com
 *
 * Created by henryehly on 2017/03/20.
 */

const Utility = require('./utility');
const config  = require('../../config');
const k       = require('../../config/keys.json');

const Promise = require('bluebird');
const sodium  = require('sodium').api;
const jwt     = require('jsonwebtoken');
const _       = require('lodash');

module.exports.validateRequest = function(req, callback) {
    const token = Utility.extractAuthTokenFromRequest(req);

    // todo: audience?
    const args = {
        issuer: config.get(k.API.Hostname),
        audience: '',
        algorithms: ['RS256']
    };

    jwt.verify(token, config.get(k.PublicKey), args, callback);
};

module.exports.refreshToken = function(token, callback) {
    const cloneToken = _.cloneWith(token, function(value, key) {
        if (key !== 'exp') {
            return value;
        }
    });

    const args = {
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    jwt.sign(cloneToken, config.get(k.PrivateKey), args, callback);
};

module.exports.generateTokenForAccountId = function(accountId) {
    const token = {
        iss: config.get(k.API.Hostname),
        sub: accountId,
        aud: ''
    };

    const args = {
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    return Promise.promisify(jwt.sign)(token, config.get(k.PrivateKey), args);
};

module.exports.setAuthHeadersOnResponseWithToken = function(res, token) {
    res.set('X-GN-Auth-Token', token);

    // todo: move to Utility & add test
    const oneHour = (1000 * 60 * 60);
    const oneHourFromNow = Date.now() + oneHour;
    res.set('X-GN-Auth-Expire', oneHourFromNow.toString());
};

module.exports.extractAccountIdFromRequest = function(req) {
    return jwt.decode(Utility.extractAuthTokenFromRequest(req)).sub;
};

module.exports.hashPassword = function(password) {
    if (!password) {
        throw new ReferenceError('No password provided');
    }

    if (!_.isString(password)) {
        throw new TypeError('Password must be a string');
    }

    const passwordBuffer = new Buffer(password);
    const pwhash = sodium.crypto_pwhash_str(
        passwordBuffer,
        sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
        sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE
    );

    return pwhash.toString();
};

module.exports.verifyPassword = function(pwhash, password) {
    if (!pwhash || !password) {
        throw new ReferenceError('Hash and password are required');
    }

    if (!_.isString(pwhash) || !_.isString(password)) {
        throw new TypeError('Hash and password must both be strings');
    }

    const pwhashBuffer   = new Buffer(pwhash);
    const passwordBuffer = new Buffer(password);

    try {
        return sodium.crypto_pwhash_str_verify(pwhashBuffer, passwordBuffer);
    } catch (e) {
        return false;
    }
};
