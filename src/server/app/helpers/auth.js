/**
 * auth
 * get-native.com
 *
 * Created by henryehly on 2017/03/20.
 */

const jwt   = require('jsonwebtoken');
const nconf = require('nconf');
const Utility = require('./utility');
const Promise = require('bluebird');
const kPublicKey = require('../../config/strings.js').kPublicKey;
const kPrivateKey = require('../../config/strings.js').kPrivateKey;

module.exports.validateRequest = function(req, callback) {
    let token = Utility.extractAuthTokenFromRequest(req);

    // todo: audience?
    const args = {
        issuer: nconf.get('hostname'),
        audience: '',
        algorithms: ['RS256']
    };

    jwt.verify(token, nconf.get(kPublicKey), args, callback);
};

module.exports.refreshToken = function(token, callback) {
    const newToken = Object.assign({}, token);

    delete newToken.exp;

    const args = {
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    jwt.sign(newToken, nconf.get(kPrivateKey), args, callback);
};

module.exports.generateTokenForAccountId = function(accountId) {
    let token = {
        iss: nconf.get('hostname'),
        sub: accountId,
        aud: ''
    };

    const args = {
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    return Promise.promisify(jwt.sign)(token, nconf.get(kPrivateKey), args);
};

module.exports.setAuthHeadersOnResponseWithToken = function(res, token) {
    res.set('X-GN-Auth-Token', token);

    // todo: move to Utility & add test
    const oneHour = (1000 * 60 * 60);
    const oneHourFromNow = Date.now() + oneHour;
    res.set('X-GN-Auth-Expire', oneHourFromNow.toString());
};

module.exports.extractAccountIdFromRequest = function(req) {
    let authToken = Utility.extractAuthTokenFromRequest(req);
    return jwt.decode(authToken).sub;
};
