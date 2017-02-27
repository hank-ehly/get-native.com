/**
 * 20170226215117-followers
 * get-native.com
 *
 * Created by henryehly on 2017/02/27.
 */

const models = require('../../app/models');
const helper = require('../seed-helper');

const Speaker = models.Speaker;
const Account = models.Account;

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Account.min('id'), Account.max('id'), Speaker.min('id'), Speaker.max('id')]).then((x) => {
            let followers = [];

            for (let i = 0; i < 5000; i++) {
                followers.push({speaker_id: helper.rand(x[2], x[3])});
            }

            for (let i = 0; i < followers.length; i++) {
                followers[i].account_id = helper.rand(x[0], x[1]);
            }

            return queryInterface.bulkInsert('followers', followers);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('followers');
    }
};
