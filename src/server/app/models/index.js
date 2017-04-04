/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/02/23.
 */

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../../config/database.json')[env];
const _         = require('lodash');

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname).filter(file => {
    return !_.startsWith(file, '.') && _.endsWith(file, '.js') && file !== path.basename(module.filename);
}).forEach(file => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].options.associations) {
        db[modelName].options.associations(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
