/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const Promise = require('bluebird');

const nconf = require('nconf');
//noinspection JSUnresolvedFunction
nconf.use('memory');
//noinspection JSUnresolvedFunction
nconf.argv();
//noinspection JSUnresolvedFunction
nconf.env();

const fs       = require('fs');
const confPath = './config/environments/';

require(confPath + 'base');

const envConf  = confPath + (nconf.get('env') || 'development');
if (fs.existsSync(envConf)) {
    require(envConf);
}

const logger   = require('./config/logger');
const server   = require('./config/initializers/server');
const database = require('./config/initializers/database');
const mailer   = require('./config/initializers/mailer');

logger.info(`Initializing ${nconf.get('env').toUpperCase()} environment`);

module.exports = Promise.all([server(), database(), Promise.promisify(mailer.verify)()]).spread((server) => {
    logger.info('Initialization successful.');
    return server;
}).catch(e => {
    logger.info('Initialization failed with error', e, {json: true});
    return e;
});
