/**
 * database
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const Sequelize = require('sequelize');
const nconf     = require('nconf');
const logger    = require('../logger');

const defaultTableConfig = {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
};

const sequelize = new Sequelize(nconf.get('db:name'), nconf.get('db:user'), nconf.get('db:pass'), {
    host: nconf.get('db:host'),
    dialect: 'mysql',
    port: nconf.get('db:port'),
    logging: logger.info,
    define: defaultTableConfig
});

module.exports.init = function(callback) {
    sequelize.authenticate().then(() => callback()).catch(e => callback(e.toString()));
};

module.exports.sequelize = sequelize;
