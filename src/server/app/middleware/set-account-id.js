/**
 * set-account-id
 * get-native.com
 *
 * Created by henryehly on 2017/04/21.
 */

const Auth = require('../services').Auth;

const _    = require('lodash');

module.exports = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        _.assign(req, {
            accountId: Auth.extractAccountIdFromRequest(req)
        });
    }
    next();
};
