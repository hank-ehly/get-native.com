/**
 * auth
 * get-native.com
 *
 * Created by henryehly on 2017/03/20.
 */

const jwt   = require('jsonwebtoken');
const nconf = require('nconf');
const Utility = require('./utility');

module.exports.validateRequest = function(req, callback) {
    let token = Utility.extractAuthTokenFromRequest(req);

    // todo: audience?
    const args = {
        issuer: nconf.get('hostname'),
        audience: '',
        algorithms: ['RS256']
    };

    jwt.verify(token, nconf.get('publicKey'), args, callback);
};

module.exports.refreshToken = function(token, callback) {
    const newToken = Object.assign({}, token);

    delete newToken.exp;

    const args = {
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    jwt.sign(newToken, nconf.get('privateKey'), args, callback);
};

module.exports.generateTokenForAccountId = function(accountId, callback) {
    let token = {
        iss: nconf.get('hostname'),
        sub: accountId,
        aud: ''
    };

    const args = {
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    jwt.sign(token, nconf.get('privateKey'), args, callback);
};

module.exports.setAuthHeadersOnResponseWithToken = function(res, token) {
    res.set('X-GN-Auth-Token', token);

    const oneHour = (1000 * 60 * 60);
    const oneHourFromNow = Date.now() + oneHour;
    res.set('X-GN-Auth-Expire', oneHourFromNow.toString());
};

module.exports.extractAccountIdFromRequest = function(req) {
    let authToken = Utility.extractAuthTokenFromRequest(req);
    return jwt.decode(authToken).sub;
};
