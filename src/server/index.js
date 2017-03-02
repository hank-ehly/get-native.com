/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const nconf    = require('nconf');
const server   = require('./config/initializers/server');
const logger   = require('./config/logger');
const database = require('./config/initializers/database');

//noinspection JSUnresolvedFunction
nconf.use('memory');
//noinspection JSUnresolvedFunction
nconf.argv();
//noinspection JSUnresolvedFunction
nconf.env();

require('./config/environments/base');
require('./config/environments/' + (nconf.get('NODE_ENV') || 'development'));

logger.info(`Initializing ${nconf.get('env').toUpperCase()} environment`);

module.exports = Promise.all([server(), database()]).then(app => {
    logger.info('Server/Database initialization successful.');
    return app;
}).catch(error => {
    logger.info('Server/Database initialization failed with error', error, {json: true});
    return error;
});
