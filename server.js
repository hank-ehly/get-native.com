/**
 * index
 * api.getnativelearning.com
 *
 * Created by henryehly on 2017/01/15.
 */


const config = require('./server/config/application').config;
const k = require('./server/config/keys.json');

const logger = require('./server/config/logger');
const server = require('./server/config/initializers/server');
const mailer = require('./server/config/initializers/mailer');
const db = require('./server/app/models');
const _ = require('lodash');

logger.info(`Initializing ${_.toUpper(config.get(k.ENVIRONMENT))} environment`);

const initPromises = [server(), db.sequelize.authenticate(), new Promise(mailer.verify)];

if (config.get(k.ENVIRONMENT) === k.Env.Development) {
    const MailDev = require('maildev');
    const mailServer = new MailDev();
    initPromises.push(new Promise(mailServer.listen));
}

module.exports = Promise.all(initPromises).then(values => {
    const [server] = values;
    logger.info('Initialization successful');
    return {
        server: server,
        db: db,
        mailer: mailer
    };
}).catch(e => {
    logger.info('Initialization failed:', e, {json: true});
    return e;
});
