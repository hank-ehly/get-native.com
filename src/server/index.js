/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const k       = require('./config/keys.json');
const config  = require('./config');

const db      = require('./app/models');
const logger  = require('./config/logger');
const server  = require('./config/initializers/server');
const mailer  = require('./config/initializers/mailer');
const Promise = require('bluebird');

logger.info(`Initializing ${config.get(k.NODE_ENV).toUpperCase()} environment`);

const initializationPromises = [
    server(),
    db.sequelize.authenticate(),
    Promise.promisify(mailer.verify)()
];

if (config.get(k.NODE_ENV) === k.Env.Development) {
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
