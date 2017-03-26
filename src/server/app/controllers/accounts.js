/**
 * accounts
 * get-native.com
 *
 * Created by henryehly on 2017/02/03.
 */

const Utility    = require('../helpers').Utility;
const Account    = require('../models').Account;
const AuthHelper = require('../helpers').Auth;

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

module.exports.update = (req, res) => {
    res.sendStatus(204);
};

module.exports.updatePassword = (req, res) => {
    res.sendStatus(204);
};

module.exports.updateEmail = (req, res) => {
    res.sendStatus(204);
};
