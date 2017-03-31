/**
 * categories
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const models = require('../models');
const ResponseWrapper = require('../helpers').ResponseWrapper;

module.exports.index = (req, res) => {
    models.Category.findAll({
        attributes: ['id', 'name'],
        include: [{model: models.Subcategory, as: 'subcategories', attributes: ['id', 'name']}]
    }).then(categories => {
        const categoriesAsJson = ResponseWrapper.deepWrap(categories.map(c => c.get({plain: true})), ['subcategories']);
        res.send(categoriesAsJson);
    }).catch(e => {
        next(e);
    });
};
