/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const nconf  = require('nconf');
const server = require('./config/initializers/server');
const logger = require('./config/logger');

nconf.use('memory');
nconf.argv();
nconf.env();

require('./config/environments/' + (nconf.get('NODE_ENV') || 'development'));

logger.info(`Initializing ${nconf.get('env').toUpperCase()} environment`);

// Todo: initialize database

server((error) => {
    if (error) {
        logger.error('Initialization failed: ', error);
    } else {
        logger.info(`Initialization of ${nconf.get('env').toUpperCase()} environment was successful`);
    }
});
