/**
 * 20170226053238-speakers
 * get-native.com
 *
 * Created by henryehly on 2017/02/26.
 */

let speakers = require('../seed-data/speakers.json');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('speakers', speakers);
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('speakers');
    }
};
