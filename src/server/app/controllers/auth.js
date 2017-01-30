/**
 * auth
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const nconf  = require('nconf');
const jwt    = require('jsonwebtoken');
const logger = require('../../config/logger');

module.exports.login = (req, res) => {
    logger.info(req.body);
    let mock = require('../../mock/login.json');

    // Todo: obtain from db
    let userId = 123;

    generateTokenForUserId(userId, (err, token) => {
        if (err) throw new Error(err);

        authorizeResponseWithToken(res, token);
        res.send(mock);
    });
};

module.exports.authenticate = (req, res, next) => {
    validateRequest(req, (err, token) => {
        if (err) throw new Error(err);

        refreshToken(token, (err, token) => {
            if (err) throw new Error(err);

            authorizeResponseWithToken(res, token);
            next();
        })
    });
};

function validateRequest(req, callback) {
    let authorization = req.get('Authorization');

    if (!authorization) {
        throw new Error('No Authorization header on request.');
    }

    let token = authorization.split(' ')[1];

    if (!token) {
        throw new Error('No token provided.');
    }

    const args = {
        issuer: 'api.get-native.com',
        audience: '',
        algorithms: ['RS256']
    };

    jwt.verify(token, nconf.get('publicKey'), args, callback);
}

function refreshToken(token, callback) {
    const newToken = {
        iss: token.iss,
        sub: token.sub,
        aud: token.aud
    };

    const args = {
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    jwt.sign(newToken, nconf.get('privateKey'), args, callback);
}

function generateTokenForUserId(userId, callback) {
    let token = {
        iss: 'api.get-native.com',
        sub: userId,
        aud: ''
    };

    const args = {
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    jwt.sign(token, nconf.get('privateKey'), args, callback);
}

function authorizeResponseWithToken(res, token) {
    res.set('X-GN-Auth-Token', token);
    res.set('X-GN-Auth-Expire', (Date.now() + (1000 * 60 * 60)).toString());
}
