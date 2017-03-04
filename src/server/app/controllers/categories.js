/**
 * categories
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const models = require('../models');

const Category = models.Category;
const Subcategory = models.Subcategory;

module.exports.list = (req, res) => {
    Category.findAll().then(categories => {
        Subcategory.findAll().then(subcategories => {

            let response = {
                records: categories,
                count: categories.length
            };

            for (let i = 0; i < response.records.length; i++) {
                let record = response.records[i];

                record.topics = {
                    records: [],
                    count: 0
                };

                for (let j = 0; j < subcategories.length; j++) {
                    if (subcategories[j].category_id === record.id) {
                        record.topics.records.push({
                            id: subcategories[j].id,
                            id_str: subcategories[j].id,
                            name: subcategories[j].name
                        });

                        record.topics.count += 1;
                    }
                }
            }

            res.send(response);
        });
    });
};
