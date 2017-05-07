#!/usr/bin/env node


const config    = require('../../../config');
const k         = require('../../../config/keys.json');
const dbconf    = require(__dirname + '/../../../config/database.json')[config.get(k.ENVIRONMENT)];

const Sequelize = require('sequelize');
const moment    = require('moment');
const fs        = require('fs');

dbconf.dialectOptions = {
    multipleStatements: true
};

const sequelize = new Sequelize(dbconf.database, dbconf.username, dbconf.password, dbconf);

fs.readFile(__dirname + '/clean.sql', 'utf8', (err, sql) => {
    if (err) {
        throw err;
    }

    const yesterday = moment()
        .subtract(1, 'days')
        .format("YYYY-MM-DD HH:mm:ss");

    return sequelize.query(sql, {replacements: [yesterday]});
});
