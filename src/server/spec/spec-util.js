/**
 * spec-util
 * get-native.com
 *
 * Created by henryehly on 2017/03/03.
 */

const request = require('supertest');
const exec    = require('child_process').exec;
const url     = require('url');
const MailDev = require('maildev');
const Promise = require('bluebird');

let _maildev = null;

module.exports.defaultTimeout = 30000;

module.exports.seedAll = function() {
    return new Promise((resolve, reject) => {
        module.exports.seedAllUndo().then(() => {
            exec('npm run sequelize db:seed:all', function(e) {
                if (e) {
                    reject(e);
                } else {
                    resolve();
                }
            });
        });
    });
};

module.exports.seedAllUndo = function() {
    return new Promise((resolve, reject) => {
        exec('npm run sequelize db:seed:undo:all', function(e) {
            if (e) {
                reject(e);
            } else {
                resolve();
            }
        });
    });
};

module.exports.startMailServer = function() {
    _maildev = new MailDev({silent: true});
    return Promise.promisify(_maildev.listen)();
};

module.exports.stopMailServer = function() {
    return Promise.promisify(_maildev.end)();
};

module.exports.getAllEmail = function(callback) {
    setTimeout(function() {
        _maildev.getAllEmail(function(error, emails) {
            callback(error, emails);
        });
    }, 1);
};

module.exports.login = function(cb) {
    delete require.cache[require.resolve('../index')];

    require('../index').then(function(_) {
        server = _;

        request(_).post('/login').send({
            email: 'test@email.com',
            password: 'test_password'
        }).then(function(response) {
            cb(_, 'Bearer: ' + response.header['x-gn-auth-token'], response.body);
        });
    });
};

module.exports.isNumber = function(value) {
    return new RegExp(/^[0-9]+$/).test(value);
};

module.exports.isParsableDateValue = function(value) {
    return new Date(value).toDateString() !== 'Invalid Date';
};

module.exports.isValidURL = function(value) {
    let parsedURL = url.parse(value);
    return parsedURL.protocol && parsedURL.hostname;
};

module.exports.isValidEmail = function(value) {
    let regex = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*');
    return regex.test(value);
};

// 'Thu Dec 14 04:35:55 +0000 2017'
module.exports.isClientFriendlyDateString = function(value) {
    let regex = /[A-Z][a-z][a-z]\s[A-Z][a-z][a-z]\s[0-3][0-9]\s[0-2][0-9]:[0-5][0-9]:[0-5][0-9]\s\+[0-9][0-9][0-9][0-9]\s[0-9][0-9][0-9][0-9]/g
    return regex.test(value);
};
