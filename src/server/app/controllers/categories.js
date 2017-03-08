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
        // by calling categories[0].toJSON() you get:
        // { id: 11,
        //   name: 'Culture',
        //   subcategories:
        //       [ { name: 'libero non mattis' },
        //         { name: 'justo lacinia' },
        //         { name: 'luctus rutrum nulla tellus' },
        //         { name: 'faucibus orci luctus' } ] }
        // http://docs.sequelizejs.com/en/latest/api/instance/#tojson-object

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
    }).catch((error) => {

        // Todo: What should you return to the client?
        res.send(error);

        throw new Error(error);
    });
};
