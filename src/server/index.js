/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const nconf  = require('nconf');
const server = require('./config/initializers/server');
const database = require('./config/initializers/database');
const logger = require('./config/logger');

//noinspection JSUnresolvedFunction
nconf.use('memory');
//noinspection JSUnresolvedFunction
nconf.argv();
//noinspection JSUnresolvedFunction
nconf.env();

require('./config/environments/base');
require('./config/environments/' + (nconf.get('NODE_ENV') || 'development'));

logger.info(`Initializing ${nconf.get('env').toUpperCase()} environment`);

server((error) => {
    if (!error) {
        logger.info(`Initialization of ${nconf.get('env').toUpperCase()} server was successful.`);

        database((error) => {
            if (!error) {
                logger.info(`Initialization of ${nconf.get('env').toUpperCase()} database was successful.`);
            } else {
                logger.error('Failed to start database: ', error);
            }
        });

    } else {
        logger.error('Failed to start server: ', error);
    }
});
