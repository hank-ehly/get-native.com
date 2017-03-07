/**
 * database
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const Sequelize = require('sequelize');
const nconf = require('nconf');
const dbconf = require('../../db/database.js');
const logger = require('../logger');

module.exports = () => {
    let e = nconf.get('env');

    const sequelize = new Sequelize(dbconf[e].database, dbconf[e].username, dbconf[e].password, {
        host: dbconf[e].host,
        dialect: dbconf[e].dialect,
        port: 3306,
        logging: ['test', 'circle_ci'].includes(e) ? false : logger.info
    });

    return sequelize.authenticate();
};
