/**
 * config
 * get-native.com
 *
 * Created by henryehly on 2017/04/04.
 */

const logger  = require('./logger');
const k       = require('./keys.json');

const Promise = require('bluebird');
const nconf   = require('nconf');
const fs      = Promise.promisifyAll(require('fs'));
const _       = require('lodash');

function Config() {
    nconf.env([k.API.Port, k.Debug, k.NODE_ENV]).use('memory');

    let config = {};

    const env = _.toLower(nconf.get(k.NODE_ENV) || k.Env.Development);

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

    const promises = [
        fs.readFileAsync(__dirname + '/secrets/id_rsa.pem', 'utf8'),
        fs.readFileAsync(__dirname + '/secrets/id_rsa', 'utf8')
    ];

    if (!_.includes([k.Env.Development, k.Env.Test, k.Env.CircleCI], nconf.get(k.NODE_ENV))) {
        promises.push(fs.readFileAsync('/etc/dkimkeys/' + config.get(k.Client.Host) + '/mail.private', 'utf8'));
    }

    Promise.all(promises).then(results => {
        nconf.set(k.PublicKey, _.first(results));
        nconf.set(k.PrivateKey, _.nth(results, 1));
        if (results.length === 3) {
            nconf.set(k.DKIMPrivateKey, _.nth(results, 2));
        }
    }).catch(e => {
        throw e; // todo: a non-existent DKIM key might throw an error
    });
}

Config.prototype.get = function(key) {
    return nconf.get(key);
};

const config = new Config();

module.exports = config;
