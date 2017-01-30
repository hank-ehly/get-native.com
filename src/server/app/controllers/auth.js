/**
 * auth
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const logger = require('../../config/logger');
const jwt    = require('jsonwebtoken');
const fs     = require('fs');

module.exports.login = (req, res) => {
    logger.info(req.body);
    let mock = require('../../mock/login.json');

    // Todo: obtain from db
    let userId = 123;

    generateTokenForUser(userId, (err, token) => {
        if (err) {
            throw new Error(err);
        }

        authorizeResponseWithToken(res, token);

        res.send(mock);
    });
};

module.exports.authenticate = (req, res, next) => {
    // Todo: use promises
    validateRequest(req, (err, token) => {
        if (err) {
            throw new Error(err);
        }

        refreshToken(token, (err, token) => {
            if (err) {
                throw new Error(err);
            }

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

    // Todo: read into nconf for easier access
    let publicKey = fs.readFileSync(`${__dirname}/../../config/secrets/id_rsa.pem`);

    const args = {
        issuer: 'api.get-native.com',
        audience: '',
        algorithms: ['RS256']
    };

    jwt.verify(token, publicKey, args, callback);
}

function refreshToken(token, callback) {
    const newToken = {
        iss: token.iss,
        sub: token.sub,
        aud: token.aud
    };

    let privateKey = fs.readFileSync(`${__dirname}/../../config/secrets/id_rsa`);

    const args = {
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    jwt.sign(newToken, privateKey, args, callback);
}

function generateTokenForUser(userId, callback) {
    let token = {
        iss: 'api.get-native.com',
        sub: userId,
        aud: ''
    };

    // Todo: read into nconf for easier access
    let privateKey = fs.readFileSync(`${__dirname}/../../config/secrets/id_rsa`);

    const args = {
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    jwt.sign(token, privateKey, args, callback);
}

function authorizeResponseWithToken(res, token) {
    res.set('X-GN-Auth-Token', token);
    res.set('X-GN-Auth-Expire', (Date.now() + (1000 * 60 * 60)).toString());
}
