/**
 * database
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const Sequelize = require('sequelize');
const nconf     = require('nconf');
const dbconf    = require('../../db/database.json');
const logger    = require('../logger');

module.exports = () => {
    let env = nconf.get('env');

    const sequelize = new Sequelize(dbconf[env].database, dbconf[env].username, dbconf[env].password, {
        host: dbconf[env].host,
        dialect: dbconf[env].dialect,
        port: 3306,
        logging: logger.info
    });

    return sequelize.authenticate()
};
