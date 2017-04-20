/**
 * auth
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const services          = require('../services');
const GetNativeError    = services.GetNativeError;
const Utility           = services.Utility;
const Auth              = services.Auth;
const config            = require('../../config');
const db                = require('../models');
const Account           = db.Account;
const VerificationToken = db.VerificationToken;
const mailer            = require('../../config/initializers/mailer');
const i18n              = require('i18n');
const k                 = require('../../config/keys.json');

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

        if (!account || !Auth.verifyPassword(account.password, req.body[k.Attr.Password])) {
            throw new GetNativeError(k.Error.UserNamePasswordIncorrect);
        }

        return Auth.generateTokenForAccountId(account.id);
    }).then(token => {
        Auth.setAuthHeadersOnResponseWithToken(res, token);
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

    // todo: Use DB unique key constraint to throw error
    return Account.existsForEmail(req.body[k.Attr.Email]).then(exists => {
        if (exists) {
            throw new GetNativeError(k.Error.AccountAlreadyExists);
        }
        return Account.create({
            email: req.body[k.Attr.Email],
            password: Auth.hashPassword(req.body[k.Attr.Password])
        });
    }).then(_account => {
        account = _account;
        if (!account) {
            throw new Error('Failed to create new account');
        }
        return VerificationToken.create({
            account_id: account.id,
            token: Auth.generateVerificationToken(),
            expiration_date: Utility.tomorrow()
        });
    }).then(verificationToken => {
        req.app.render('welcome', {
            confirmationURL: Auth.generateConfirmationURLForToken(verificationToken.get('token'))
        }, (err, html) => {
            return mailer.sendMail({
                subject: i18n.__('welcome.title'),
                from:    config.get(k.NoReply),
                to:      req.body[k.Attr.Email],
                html:    html
            });
        });
    }).then(() => {
        return Auth.generateTokenForAccountId(account.id);
    }).then(token => {
        Auth.setAuthHeadersOnResponseWithToken(res, token);
        const accountAsJson = account.get({plain: true});
        delete accountAsJson.password;
        res.send(accountAsJson);
    }).catch(GetNativeError, e => {
        if (e.code === k.Error.AccountAlreadyExists) {
            next({body: e, status: 422});
        }
    }).catch(next);
};

module.exports.confirmEmail = (req, res, next) => {
    const token = req.body.token;

    return VerificationToken.findOne({where: {token: token}}).then(token => {
        if (token.isExpired()) {
            throw new GetNativeError(k.Error.TokenExpired);
        }

        const changes = {};
        changes[k.Attr.EmailVerified] = true;

        return Account.update(changes, {where: {id: token.account_id}});
    }).then(account => {
        return Auth.generateTokenForAccountId(account.id);
    }).then(function(token) {
        Auth.setAuthHeadersOnResponseWithToken(res, token);
        res.sendStatus(204);
    }).catch(GetNativeError, e => {
        if (e.code === k.Error.TokenExpired) {
            next({body: e, status: 404});
        }
    }).catch(e => {
        res.sendStatus(404);
    });
};

module.exports.resendConfirmationEmail = (req, res, next) => {
    Account.existsForEmail(req.body[k.Attr.Email]).then(exists => {
        if (!exists) {
            throw new GetNativeError(k.Error.AccountMissing);
        }

        return Account.findOne({where: {email: req.body[k.Attr.Email]}});
    }).then(function(account) {
        if (account.get('email_verified')) {
            throw new GetNativeError(k.Error.AccountAlreadyVerified);
        }

        const token = Auth.generateVerificationToken();
        const expirationDate = Utility.tomorrow();

        return VerificationToken.create({
            account_id: account.get('id'),
            token: token,
            expiration_date: expirationDate
        });
    }).then(verificationToken => {
        req.app.render('welcome', {
            confirmationURL: Auth.generateConfirmationURLForToken(verificationToken.get('token'))
        }, (err, html) => {
            return mailer.sendMail({
                subject: i18n.__('welcome.title'),
                from:    config.get(k.NoReply),
                to:      req.body[k.Attr.Email],
                html:    html
            });
        });
    }).then(() => {
        res.sendStatus(204);
    }).catch(GetNativeError, e => {
        if (e.code === k.Error.AccountMissing) {
            next({status: 404, body: e});
        } else if (e.code === k.Error.AccountAlreadyExists) {
            next({status: 422, body: e});
        } else {
            next(e);
        }
    }).catch(next);
};

module.exports.authenticate = (req, res, next) => {
    return Auth.validateRequest(req).then(token => {
        return Auth.refreshToken(token);
    }).then(token => {
        Auth.setAuthHeadersOnResponseWithToken(res, token);
        next();
    }).catch(e => {
        next({raw: e, status: 401, body: new GetNativeError(k.Error.JWT)});
    });
};
