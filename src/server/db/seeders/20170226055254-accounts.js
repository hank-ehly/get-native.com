/**
 * 20170226055254-accounts
 * get-native.com
 *
 * Created by henryehly on 2017/02/26.
 */

const chance = require('chance').Chance();

module.exports = {
    up: function(queryInterface, Sequelize) {
        const accounts = [];

        for (let i = 0; i < 20000; i++) {
            accounts.push({
                email: chance.email(),
                password: chance.string({length: 20}),
                browser_notifications_enabled: chance.bool(),
                email_notifications_enabled: chance.bool(),
                email_verified: chance.bool({likelihood: 80}),
                default_study_language_code: chance.pickone(['en', 'ja']),
                picture_url: 'https://dummyimage.com/100x100.png/5fa2dd/ffffff'
            });
        }

        return queryInterface.bulkInsert('accounts', accounts);
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('accounts');
    }
};
