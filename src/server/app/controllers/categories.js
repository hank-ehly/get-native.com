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
        include: [
            {
                model: models.Subcategory,
                as: 'subcategories',
                attributes: ['name']
            }
        ]
    }).then(categories => {
        let categoriesAsJson = categories.map(c => c.toJSON());
        let wrappedResponse = ResponseWrapper.deepWrap(categoriesAsJson, ['subcategories']);
        res.send(wrappedResponse);
    });
};
