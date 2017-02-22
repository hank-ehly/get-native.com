/**
 * Category
 * get-native.com
 *
 * Created by henryehly on 2017/02/23.
 */

const Sequelize = require('sequelize');
const sequelize = require('../../config/initializers/database').sequelize;

const Category = sequelize.define('categories', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    }
});

module.exports = Category;

// Category.hasMany(Subcategories) // fk-name
