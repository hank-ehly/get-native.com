/**
 * categories
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

module.exports.list = (req, res) => {
    let mockList = require('../../mock/categories.json');
    res.send(mockList);
};
