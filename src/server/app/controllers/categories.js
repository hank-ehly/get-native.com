/**
 * categories
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const models = require('../models');

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
        let response = {
            records: [],
            count: categories.length
        };

        for (let i = 0; i < categories.length; i++) {
            response.records[i] = {
                id: categories[i].id,
                name: categories[i].name,
                subcategories: {
                    records: [],
                    count: categories[i].subcategories.length
                },
            };

            for (let j = 0; j < categories[i].subcategories.length; j++) {
                response.records[i].subcategories.records[j] = {
                    name: categories[i].subcategories[j].name
                };
            }
        }

        res.send(response);
    });
};
