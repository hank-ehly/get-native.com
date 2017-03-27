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
const _          = require('lodash');

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
        if (!_account) {
            throw new Error(`No account found for email '${req.body[k.Attr.Email]}'`);
        }

        account = _account;

        // todo: error handling
        if (!AuthHelper.verifyPassword(account.password, req.body[k.Attr.Password])) {
            throw new Error(`Password incorrect`);
        }

        return AuthHelper.generateTokenForAccountId(account.id);
    }).then(token => {
        AuthHelper.setAuthHeadersOnResponseWithToken(res, token);
        const accountAsJson = account.get({plain: true});
        delete accountAsJson.password;
        res.send(accountAsJson);
    }).catch(e => {
        return next({
            message: 'Authentication Error',
            errors: [{message: e}]
        });
    });
};

function generateWelcomeEmailForRequest(req, callback) {
    const locale           = 'en'; // req.headers['accept-language']
    const localeModule     = require(__dirname + '/../../config/locales/' + locale + '.json');
    const templatesDir     = __dirname + '/../templates/';
    const textTemplatePath = templatesDir + 'welcome.txt';
    const htmlTemplatePath = templatesDir + 'welcome.html';

    return Promise.all([fs.readFileAsync(textTemplatePath), fs.readFileAsync(htmlTemplatePath)]).spread((textTemplate, htmlTemplate) => {
        const templates = _.mapValues({textTemplate: textTemplate, htmlTemplate: htmlTemplate}, (value) => {
            return _.template(value.toString())({
                lang: locale,
                title: localeModule.templates.welcome.title,
                instructions: localeModule.templates.welcome.instructions,
                confirmationLinkLabel: localeModule.templates.welcome.confirmationLinkLabel,
                confirmationLinkUrl: 'https://hankehly.com', // todo: timed expiry link? resend link?
                footer: localeModule.templates.welcome.footer
            });
        });

        callback({
            from: nconf.get(k.NoReply),
            to: req.body[k.Attr.Email],
            subject: localeModule.templates.welcome.title,
            text: templates.textTemplate,
            html: templates.htmlTemplate
        });
    }).catch((e) => {
        return next({
            message: 'Error',
            errors: [{message: e}]
        });
    });
}

module.exports.register = (req, res, next) => {
    let account = null;

    // todo: shouldn't this be done by db validations?
    Account.existsForEmail(req.body[k.Attr.Email]).then(exists => {
        // todo: throw to catch
        if (exists) {
            throw new Error('Account already exists!');
        }

        const securePassword = AuthHelper.hashPassword(req.body[k.Attr.Password]);

        return Account.create({
            email: req.body[k.Attr.Email],
            password: securePassword
        });
    }).then(_account => {
        if (!_account) {
            return next(new Error('Missing account!'));
        }

        account = _account;
        generateWelcomeEmailForRequest(req, mail => {
            return mailer.sendMail(mail);
        });
    }).then(() => {
        return AuthHelper.generateTokenForAccountId(account.id);
    }).then(token => {
        AuthHelper.setAuthHeadersOnResponseWithToken(res, token);
        const accountAsJson = account.get({plain: true});
        delete accountAsJson.password;
        res.send(accountAsJson);
    }).catch((e) => {
        next({
            message: 'Error',
            errors: [{message: e}]
        });
    });
};

module.exports.authenticate = (req, res, next) => {
    AuthHelper.validateRequest(req, (err, token) => {
        if (err) {
            return next(err);
        }

        AuthHelper.refreshToken(token, (err, token) => {
            if (err) {
                return next(err);
            }

            AuthHelper.setAuthHeadersOnResponseWithToken(res, token);
            next();
        })
    });
};
