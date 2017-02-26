/**
 * 20170226230740-subcategories
 * get-native.com
 *
 * Created by henryehly on 2017/02/27.
 */

const Category = require('../../app/models').Category;
const subcategories = require('../seed-data/subcategories.json');
const Helper = require('../seed-helper');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Category.min('id'), Category.max('id')]).then(x => {
            for (let i = 0; i < subcategories.length; i++) {
                subcategories[i].category_id = Helper.rand(x[0], x[1]);
            }

            return queryInterface.bulkInsert('subcategories', subcategories);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('subcategories');
    }
};
