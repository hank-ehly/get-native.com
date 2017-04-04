/**
 * config
 * get-native.com
 *
 * Created by henryehly on 2017/04/04.
 */

const nconf = require('nconf');
const fs    = require('fs');
const k     = require('./keys.json');
const _     = require('lodash');

function Config() {
    nconf.env([k.API.Port, k.Debug, k.NODE_ENV]).use('memory');

    const publicKey = fs.readFile(__dirname + '/secrets/id_rsa.pem', (err, data) => {
        if (err) {
            throw new Error(err);
        }
        nconf.set(k.PublicKey, data.toString());
    });

    const privateKey = fs.readFile(__dirname + '/secrets/id_rsa', (err, data) => {
        if (err) {
            throw new Error(err);
        }
        nconf.set(k.PrivateKey, data.toString());
    });

    let config = {};
    const envConf  = __dirname + '/environments/' + (nconf.get(k.NODE_ENV) || k.Env.Development).toLowerCase();

    if (fs.existsSync(envConf)) {
        config = envConf;
    }

    const defaults = require(__dirname + '/environments/default');

    config = _.defaults(config, defaults);

    for (let key in config) {
        if (config.hasOwnProperty(key)) {
            nconf.set(key, config[key]);
        }
    }
}

Config.prototype.get = function(key) {
    return nconf.get(key);
};

const config = new Config();

module.exports = config;
