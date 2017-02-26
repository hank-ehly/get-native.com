/**
 * 20170226055254-accounts
 * get-native.com
 *
 * Created by henryehly on 2017/02/26.
 */

let accounts = require('../seed-data/accounts.json');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('accounts', accounts);
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('accounts');
    }
};
