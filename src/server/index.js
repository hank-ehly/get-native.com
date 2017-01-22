/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

// Todo
// handle command line args first (if applicable)
// load OS ENV vars (if applicable) nconf.env();
// load vars from config/environments (if applicable)
// initialize database
// start server

const server = require('./config/initializers/server');
const logger = require('./config/logger');

server(() => {
    logger.info('App initialization successful.');
});
