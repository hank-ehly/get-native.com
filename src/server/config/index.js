/**
 * config
 * get-native.com
 *
 * Created by henryehly on 2017/04/04.
 */

const Promise = require('bluebird');
const logger  = require('./logger');
const nconf   = require('nconf');
const fs      = Promise.promisifyAll(require('fs'));
const k       = require('./keys.json');
const _       = require('lodash');

function Config() {
    nconf.env([k.API.Port, k.Debug, k.NODE_ENV]).use('memory');

    Promise.all([
        fs.readFileAsync(__dirname + '/secrets/id_rsa.pem'),
        fs.readFileAsync(__dirname + '/secrets/id_rsa')
    ]).spread((publicKey, privateKey) => {
        nconf.set(k.PublicKey, publicKey.toString());
        nconf.set(k.PrivateKey, privateKey.toString());
    }).catch(e => {
        throw e;
    });

    let config = {};

    const env = (nconf.get(k.NODE_ENV) || k.Env.Development).toLowerCase();

    try {
        config = require(`${__dirname}/environments/${env}`);
    } catch (e) {
        if (_.isError(e) && e.code === 'MODULE_NOT_FOUND') {
            logger.info(`${_.capitalize(env)} environment configuration file is not present. Ignoring.`);
        } else {
            throw e;
        }
    }

    config = _.defaults(config, require(`${__dirname}/environments/default`));

    for (let key in config) {
        nconf.set(key, config[key]);
    }
}

Config.prototype.get = function(key) {
    return nconf.get(key);
};

const config = new Config();

module.exports = config;
