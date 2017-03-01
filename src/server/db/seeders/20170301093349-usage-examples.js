/**
 * 20170301093349-usage-examples
 * get-native.com
 *
 * Created by henryehly on 2017/03/01.
 */

const Collocation = require('../../app/models').Collocation;
const chance = require('chance').Chance();

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Collocation.min('id'), Collocation.max('id')]).then(x => {
            const usageExamples = [];

            // for each collocation
            for (let i = x[0]; i < x[1]; i++) {

                // create 2 ~ 4 usage examples
                let numUsageExamples = chance.integer({min: 2, max: 4});
                for (let j = 0; j < numUsageExamples; j++) {

                    usageExamples.push({
                        text: chance.sentence(),
                        collocation_id: i
                    });
                }
            }

            return queryInterface.bulkInsert('usage_examples', usageExamples);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('usage_examples');
    }
};
