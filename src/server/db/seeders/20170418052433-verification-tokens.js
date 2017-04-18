/**
 * 20170418052433-verification-tokens
 * get-native.com
 *
 * Created by henryehly on 2017/04/18.
 */

const Promise = require('bluebird');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return new Promise(r => r());
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('verification_tokens');
    }
};
