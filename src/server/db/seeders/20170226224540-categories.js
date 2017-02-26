/**
 * 20170226224540-categories
 * get-native.com
 *
 * Created by henryehly on 2017/02/27.
 */

const categories = require('../seed-data/categories.json');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('categories', categories);
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('categories');
    }
};
