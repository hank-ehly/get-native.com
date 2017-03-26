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
const AuthHelper = require('../helpers').Auth;

module.exports.login = (req, res, next) => {
    const attributes = [
        'id', 'email', 'browser_notifications_enabled', 'email_notifications_enabled', 'email_verified', 'default_study_language_code',
        'picture_url', 'is_silhouette_picture'
    ];

    Account.find({where: {email: req.body.email}, attributes: attributes}).then(account => {
        AuthHelper.generateTokenForAccountId(account.id, (err, token) => {
            if (err) {
                throw new Error(err);
            }

            AuthHelper.setAuthHeadersOnResponseWithToken(res, token);
            const accountAsJson = account.get({plain: true});
            res.send(accountAsJson);
        });
    }).catch(() => {
        next({
            message: 'Authentication Error',
            errors: [{message: 'Account does not exist'}]
        })
    });
};

module.exports.authenticate = (req, res, next) => {
    AuthHelper.validateRequest(req, (err, token) => {
        if (err) throw new Error(err);

        AuthHelper.refreshToken(token, (err, token) => {
            if (err) throw new Error(err);

            AuthHelper.setAuthHeadersOnResponseWithToken(res, token);
            next();
        })
    });
};
