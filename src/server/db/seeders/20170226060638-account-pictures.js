/**
 * 20170226060638-account-pictures
 * get-native.com
 *
 * Created by henryehly on 2017/02/26.
 */

let account_pictures = require('../seed-data/account-pictures.json');
let Account = require('../../app/models').Account;

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Account.min('id'), Account.max('id')]).then((v) => {
            for (let i = v[0], j = 0; i < v[1]; i++, j++) {
                account_pictures[j].account_id = i;
            }
            return queryInterface.bulkInsert('account_pictures', account_pictures);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('account_pictures');
    }
};
