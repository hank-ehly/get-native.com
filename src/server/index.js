/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const server = require('./config/initializers/server');
const logger = require('./config/logger');
const nconf  = require('nconf');

nconf.use('memory');
nconf.argv();
nconf.env();

require('./config/environments/' + (nconf.get('NODE_ENV') || 'development'));

logger.info(`Initializing ${nconf.get('NODE_ENV').toUpperCase()} environment`);

// Todo: initialize database

server((error) => {
    if (error) {
        logger.error('Initialization failed: ', error);
    } else {
        logger.info('Initialization successful');
    }
});
