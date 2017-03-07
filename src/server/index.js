/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

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

logger.info(`Initializing ${nconf.get('env').toUpperCase()} environment`);

module.exports = Promise.all([server(), database()]).then(result => {
    let server = result[0];
    logger.info('Server/Database initialization successful.');
    return server;
}).catch(error => {
    logger.info('Server/Database initialization failed with error', error, {json: true});
    return error;
});
