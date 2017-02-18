/**
 * account
 * get-native.com
 *
 * Created by henryehly on 2017/02/03.
 */

module.exports.index = (req, res) => {
    let mock = require('../../mock/account.json');
    res.send(mock);
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
