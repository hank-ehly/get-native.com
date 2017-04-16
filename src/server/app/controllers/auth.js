/**
 * auth
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const helpers        = require('../helpers');
const GetNativeError = helpers.GetNativeError;
const AuthHelper     = helpers.Auth;
const Email          = helpers.Email;
const config         = require('../../config');
const jwt            = require('jsonwebtoken');
const logger         = require('../../config/logger');
const Account        = require('../models').Account;
const nodemailer     = require('nodemailer');
const Promise        = require('bluebird');
const fs             = Promise.promisifyAll(require('fs'));
const k              = require('../../config/keys.json');
const _              = require('lodash');

module.exports.login = (req, res, next) => {
    const attributes = [
        k.Attr.Id,
        k.Attr.Email,
        k.Attr.BrowserNotificationsEnabled,
        k.Attr.EmailNotificationsEnabled,
        k.Attr.EmailVerified,
        k.Attr.DefaultStudyLanguageCode,
        k.Attr.PictureUrl,
        k.Attr.IsSilhouettePicture,
        k.Attr.Password
    ];

    let account = null;
    Account.find({where: {email: req.body[k.Attr.Email]}, attributes: attributes}).then(_account => {
        account = _account;

        if (!account || !AuthHelper.verifyPassword(account.password, req.body[k.Attr.Password])) {
            throw new GetNativeError(k.Error.UserNamePasswordIncorrect);
        }

        return AuthHelper.generateTokenForAccountId(account.id);
    }).then(token => {
        AuthHelper.setAuthHeadersOnResponseWithToken(res, token);
        const accountAsJson = account.get({plain: true});
        delete accountAsJson.password;
        res.send(accountAsJson);
    }).catch(GetNativeError, e => next({
        body: e,
        status: 404
    })).catch(e => next(e));
};

module.exports.register = (req, res, next) => {
    let account = null;

    // todo: shouldn't this be done by db validations?
    Account.existsForEmail(req.body[k.Attr.Email]).then(exists => {
        if (exists) {
            throw new GetNativeError(k.Error.AccountAlreadyExists);
        }

        return Account.create({email: req.body[k.Attr.Email], password: AuthHelper.hashPassword(req.body[k.Attr.Password])});
    }).then(_account => {
        account = _account;

        if (!account) {
            throw new Error('Failed to create new account');
        }

        return Email.send(k.Email.Welcome, {
            from:    config.get(k.NoReply),
            to:      req.body[k.Attr.Email]
        })
    }).then(() => {
        return AuthHelper.generateTokenForAccountId(account.id);
    }).then(token => {
        AuthHelper.setAuthHeadersOnResponseWithToken(res, token);
        const accountAsJson = account.get({plain: true});
        delete accountAsJson.password;
        res.send(accountAsJson);
    }).catch(GetNativeError, e => {
        if (e.code === k.Error.AccountAlreadyExists) {
            next({body: e, status: 422});
        }
    }).catch(next);
};

module.exports.authenticate = (req, res, next) => {
    AuthHelper.validateRequest(req, (error, token) => {
        if (error) {
            return next({raw: error, status: 401, body: new GetNativeError(k.Error.JWT.Verify)});
        }

        AuthHelper.refreshToken(token, (err, token) => {
            if (error) {
                return next({raw: error, status: 401, body: new GetNativeError(k.Error.JWT.Sign)});
            }

            AuthHelper.setAuthHeadersOnResponseWithToken(res, token);
            next();
        })
    });
};
