/**
 * accounts
 * get-native.com
 *
 * Created by henryehly on 2017/02/03.
 */

const Utility    = require('../helpers').Utility;
const Account    = require('../models').Account;
const AuthHelper = require('../helpers').Auth;
const _          = require('lodash');

module.exports.index = (req, res) => {
    let accountId = AuthHelper.extractAccountIdFromRequest(req);

    Account.findById(accountId, {
        attributes: {exclude: ['password', 'created_at', 'updated_at']}
    }).then(account => {
        const accountAsJSON = account.get({plain: true});
        res.send(accountAsJSON);
    }).catch(() => {
        next({
            message: 'Error',
            errors: [{message: 'Failed to fetch account'}]
        })
    });
};

module.exports.update = (req, res, next) => {
    let accountId = AuthHelper.extractAccountIdFromRequest(req);

    const attr = _.transform(req.body, function(result, value, key) {
        const allowedAttr = ['email_notifications_enabled', 'browser_notifications_enabled', 'default_study_language_code'];
        if (allowedAttr.includes(key)) {
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

module.exports.updatePassword = (req, res) => {
    res.sendStatus(204);
};

module.exports.updateEmail = (req, res) => {
    res.sendStatus(204);
};
