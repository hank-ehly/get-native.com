/**
 * 20170226223232-notifications
 * get-native.com
 *
 * Created by henryehly on 2017/02/27.
 */

const Account = require('../../app/models').Account;
const chance = require('chance').Chance();

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Account.min('id'), Account.max('id')]).then((x) => {
            const notifications = [];

            // for each user
            for (let i = x[0]; i < x[1]; i++) {

                // create between 1 ~ 10 notifications
                let numNotifications = chance.integer({min: 1, max: 10});

                for (let j = 0; j < numNotifications; j++) {
                    notifications.push({
                        account_id: chance.integer({min: x[0], max: x[1]}),
                        title: chance.sentence({words: chance.integer({min: 2, max: 5})}),
                        content: chance.paragraph()
                    });
                }
            }

            return queryInterface.bulkInsert('notifications', notifications);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('notifications');
    }
};
