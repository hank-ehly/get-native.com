/**
 * accounts
 * get-native.com
 *
 * Created by henryehly on 2017/02/03.
 */

const Utility    = require('../helpers').Utility;
const Account    = require('../models').Account;
const AuthHelper = require('../helpers').Auth;
const k          = require('../../config/keys.json');
const _          = require('lodash');
const GetNativeError = require('../helpers').GetNativeError;

module.exports.index = (req, res, next) => {
    let accountId = AuthHelper.extractAccountIdFromRequest(req);

    Account.findById(accountId, {
        attributes: {exclude: [k.Attr.Password, k.Attr.CreatedAt, k.Attr.UpdatedAt]}
    }).then(account => {
        const accountAsJSON = account.get({plain: true});
        res.send(accountAsJSON);
    }).catch(next);
};

module.exports.update = (req, res, next) => {
    let accountId = AuthHelper.extractAccountIdFromRequest(req);

    const attr = _.transform(req.body, function(result, value, key) {
        if ([k.Attr.EmailNotificationsEnabled, k.Attr.BrowserNotificationsEnabled, k.Attr.DefaultStudyLanguageCode].includes(key)) {
            result[key] = value;
        }
    }, {});

    if (_.size(attr) === 0) {
        // todo: what status code should you return?
        return res.sendStatus(204);
    }

    return Account.update(attr, {where: {id: accountId}}).then(() => {
        res.sendStatus(204);
    }).catch(next);
};

module.exports.updatePassword = (req, res, next) => {
    let accountId = AuthHelper.extractAccountIdFromRequest(req);

    Account.findById(accountId).then(account => {
        if (!AuthHelper.verifyPassword(account.password, req.body[k.Attr.CurrentPassword])) {
            throw new GetNativeError(k.Error.PasswordIncorrect);
        }

        const hashPassword = AuthHelper.hashPassword(req.body[k.Attr.NewPassword]);
        return Account.update({password: hashPassword}, {where: {id: accountId}});
    }).then(() => {
        res.sendStatus(204);
    }).catch(GetNativeError, e => next({
        body: e,
        status: 404
    })).catch(next);
};

module.exports.updateEmail = (req, res) => {
    res.sendStatus(204);
};
