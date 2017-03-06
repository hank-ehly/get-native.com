/**
 * database.js
 * get-native.com
 *
 * Created by henryehly on 2017/03/07.
 */

module.exports = {
    development: {
        username: "get_native",
        password: "get_native",
        database: "get_native_development",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    staging: {
        username: "get_native",
        password: process.env['GET_NATIVE_DB_PASS'] || '',
        database: "get_native_staging",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    test: {
        username: "get_native",
        password: "get_native",
        database: "get_native_test",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false
    },
    circle_ci: {
        username: "ubuntu",
        database: "circle_test",
        dialect: "mysql",
        logging: false
    },
    production: {
        username: "get_native",
        password: "get_native",
        database: "get_native_production",
        host: "127.0.0.1",
        dialect: "mysql"
    }
};
