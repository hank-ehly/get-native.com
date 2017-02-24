/**
 * database
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const Sequelize = require('sequelize');
const nconf     = require('nconf');
const conf      = require('../../db/database.json');
const logger    = require('../logger');

let env = nconf.get('env');

const sequelize = new Sequelize(conf[env].database, conf[env].username, conf[env].password, {
    host: conf[env].host,
    dialect: conf[env].dialect,
    port: 3306,
    logging: logger.info
});

module.exports.init = function(cb) {
    sequelize.authenticate().then(() => cb()).catch(e => cb(e.toString()));
};

module.exports.sequelize = sequelize;
