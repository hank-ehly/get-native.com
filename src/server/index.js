/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const nconf = require('nconf');
const fs    = require('fs');
const k     = require('./config/keys.json');

// Initialize nconf memory store
nconf.env([k.API.Port, k.Debug]).use('memory');

// Load environment configuration
const confPath = __dirname + '/config/environments/';
const baseConf = confPath + 'base';
const envConf  = confPath + (nconf.get(k.API.ENV) || k.Env.Development);
require(baseConf);
if (fs.existsSync(envConf)) {
    require(envConf);
}

// Start server, database and mail server (if needed)
const db      = require('./app/models');
const logger  = require('./config/logger');
const server  = require('./config/initializers/server');
const mailer  = require('./config/initializers/mailer');
const Promise = require('bluebird');

logger.info(`Initializing ${nconf.get(k.API.ENV).toUpperCase()} environment`);

const initializationPromises = [
    server(),
    db.sequelize.authenticate(),
    Promise.promisify(mailer.verify)()
];

if (nconf.get(k.API.ENV) === k.Env.Development) {
    const MailDev = require('maildev');
    const mailServer = new MailDev();
    initializationPromises.push(Promise.promisify(mailServer.listen)());
}

module.exports = Promise.all(initializationPromises).spread(server => {
    logger.info('Initialization successful');
    return {server: server, db: db, mailer: mailer};
}).catch(e => {
    logger.info('Initialization failed:', e, {json: true});
    return e;
});
