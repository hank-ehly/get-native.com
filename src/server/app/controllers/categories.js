/**
 * categories
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const Category = require('../models/Category');

module.exports.list = (req, res) => {
    // let mockList = require('../../mock/categories.json');
    // res.send(mockList);
    Category.findAll().then(categories => res.send(categories));
};
