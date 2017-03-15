/**
 * auth
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const nconf   = require('nconf');
const jwt     = require('jsonwebtoken');
const logger  = require('../../config/logger');
const Account = require('../models').Account;

module.exports.login = (req, res) => {
    logger.info(req.body);

    const email = req.body.email;

    Account.find({where: {email: email}}).then(account => {
        generateTokenForAccountId(account.id, (err, token) => {
            if (err) {
                throw new Error(err);
            }

            setAuthHeadersOnResponseWithToken(res, token);

            // todo: account.toJSON()?
            res.send({
                id: account.id,
                email: account.email,
                browser_notifications_enabled: account.browser_notifications_enabled,
                email_notifications_enabled: account.email_notifications_enabled,
                email_verified: account.email_verified,
                default_study_language_code: account.default_study_language_code,
                picture_url: account.picture_url,
                is_silhouette_picture: account.is_silhouette_picture
            });
        });
    }).catch(error => {
        logger.error('Unable to find account.');
        // todo: send uniform error response to client
        res.send(error);
    });
};

module.exports.authenticate = (req, res, next) => {
    validateRequest(req, (err, token) => {
        if (err) throw new Error(err);

        refreshToken(token, (err, token) => {
            if (err) throw new Error(err);

            setAuthHeadersOnResponseWithToken(res, token);
            next();
        })
    });
};

function validateRequest(req, callback) {
    let token = req.get('authorization').split(' ')[1];

    if (!token) {
        throw new Error('No token provided.');
    }

    // todo: change issuer based on environment
    const args = {
        issuer: 'api.get-native.com',
        audience: '',
        algorithms: ['RS256']
    };

    jwt.verify(token, nconf.get('publicKey'), args, callback);
}

function refreshToken(token, callback) {

    // todo: use Object.assign
    // let objCopy = Object.assign({}, obj);

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

function generateTokenForAccountId(accountId, callback) {
    let token = {
        iss: 'api.get-native.com',
        sub: accountId,
        aud: ''
    };

    const args = {
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    jwt.sign(token, nconf.get('privateKey'), args, callback);
}

function setAuthHeadersOnResponseWithToken(res, token) {
    res.set('X-GN-Auth-Token', token);

    const oneHour = (1000 * 60 * 60);
    const oneHourFromNow = Date.now() + oneHour;
    res.set('X-GN-Auth-Expire', oneHourFromNow.toString());
}
