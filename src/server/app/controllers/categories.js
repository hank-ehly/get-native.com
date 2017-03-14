/**
 * categories
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const models = require('../models');
const EntityList = require('../helpers/entity-list');

module.exports.list = (req, res) => {
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
        let response = EntityList.deepWrap(categories, ['subcategories']);
        res.send(response);
    });
};
