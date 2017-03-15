/**
 * account
 * get-native.com
 *
 * Created by henryehly on 2017/02/03.
 */

const util    = require('../helpers')['utility'];
const Account = require('../models').Account;
const jwt     = require('jsonwebtoken');

module.exports.index = (req, res) => {
    let authToken = util.extractAuthTokenFromRequest(req);
    let accountId = jwt.decode(authToken).sub;

    Account.findById(accountId, {
        attributes: {exclude: ['password', 'created_at', 'updated_at']}
    }).then((account) => {
        let accountAsJson = account.toJSON();
        res.send(accountAsJson);
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
