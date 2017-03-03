/**
 * database
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const Sequelize = require('sequelize');
const nconf = require('nconf');
const dbconf = require('../../db/database.json');

module.exports = () => {
    let e = nconf.get('env');

    const sequelize = new Sequelize(dbconf[e].database, dbconf[e].username, dbconf[e].password, {
        host: dbconf[e].host,
        dialect: dbconf[e].dialect,
        port: 3306
    });

    return sequelize.authenticate();
};
