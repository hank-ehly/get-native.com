/**
 * auth
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const nconf      = require('nconf');
const jwt        = require('jsonwebtoken');
const logger     = require('../../config/logger');
const Account    = require('../models').Account;
const AuthHelper = require('../helpers').Auth;
const nodemailer = require('nodemailer');
const Promise    = require('bluebird');
const mailer     = require('../../config/initializers/mailer');
const fs         = Promise.promisifyAll(require('fs'));
const k          = require('../../config/keys.json');

module.exports.login = (req, res, next) => {
    const attributes = [
        k.Attr.Id,
        k.Attr.Email,
        k.Attr.BrowserNotificationsEnabled,
        k.Attr.EmailNotificationsEnabled,
        k.Attr.EmailVerified,
        k.Attr.DefaultStudyLanguageCode,
        k.Attr.PictureUrl,
        k.Attr.IsSilhouettePicture
    ];

    let account = null;
    Account.find({where: {email: req.body[k.Attr.Email]}, attributes: attributes}).then(_account => {
        if (!_account) {
            throw new Error(`No account found for email '${req.body[k.Attr.Email]}'`);
        }

        account = _account;
        return AuthHelper.generateTokenForAccountId(account.id);
    }).then(token => {
        AuthHelper.setAuthHeadersOnResponseWithToken(res, token);
        const accountAsJson = account.get({plain: true});
        res.send(accountAsJson);
    }).catch((e) => {
        return next({
            message: 'Authentication Error',
            errors: [{message: 'Account does not exist'}]
        });
    });
};

module.exports.register = (req, res, next) => {
    const email    = req.body[k.Attr.Email];
    const password = req.body[k.Attr.Password];
    let account    = null;

    Account.existsForEmail(req.body[k.Attr.Email]).then(exists => {
        if (exists) {
            return next({
                message: 'Error',
                errors: [{message: 'Account already exists'}]
            });
        }

        return Account.create({email: email, password: password})
    }).then(_account => {
        account = _account;
        const htmlTemplate = __dirname + '/../templates/confirm-registration.html';
        const textTemplate = __dirname + '/../templates/confirm-registration.txt';
        return Promise.all([fs.readFileAsync(htmlTemplate), fs.readFileAsync(textTemplate)]);
    }).spread((htmlTemplate, textTemplate) => {
        const message = {
            from: nconf.get(k.NoReply),
            to: email,
            subject: 'Welcome to Get Native!', // todo: 'translate' helper like Rails
            text: textTemplate.toString(),
            html: htmlTemplate.toString()
        };

        return mailer.sendMail(message).then(() => {
            return AuthHelper.generateTokenForAccountId(account.id);
        });

    }).then(token => {
        AuthHelper.setAuthHeadersOnResponseWithToken(res, token);
        const accountAsJson = account.get({plain: true});
        res.send(accountAsJson);
    }).catch((e) => {
        console.log(e);

        next({
            message: 'Error',
            errors: [{message: 'Failed to query existing accounts'}]
        });
    });
};

module.exports.authenticate = (req, res, next) => {
    AuthHelper.validateRequest(req, (err, token) => {
        if (err) return next(err);

        AuthHelper.refreshToken(token, (err, token) => {
            if (err) return next(err);

            AuthHelper.setAuthHeadersOnResponseWithToken(res, token);
            next();
        })
    });
};
