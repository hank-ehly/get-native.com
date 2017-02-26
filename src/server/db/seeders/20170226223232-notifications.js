/**
 * 20170226223232-notifications
 * get-native.com
 *
 * Created by henryehly on 2017/02/27.
 */

const Account = require('../../app/models').Account;
const notifications = require('../seed-data/notifications.json');
const Helper = require('../seed-helper');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Account.min('id'), Account.max('id')]).then((x) => {
            for (let i = 0; i < notifications.length; i++) {
                notifications[i].account_id = Helper.rand(x[0], x[1]);
            }

            return queryInterface.bulkInsert('notifications', notifications);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('notifications');
    }
};
