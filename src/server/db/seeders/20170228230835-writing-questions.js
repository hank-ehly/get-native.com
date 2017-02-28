/**
 * 20170228230835-writing-questions
 * get-native.com
 *
 * Created by henryehly on 2017/03/01.
 */

const Subcategory = require('../../app/models').Subcategory;
const chance = require('chance').Chance();

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Subcategory.min('id'), Subcategory.max('id')]).then(x => {
            const writingQuestions = [];

            for (let i = x[0]; i < x[1]; i++) {

                let j = 0;
                while (j < 5) {
                    writingQuestions.push({
                        text: chance.sentence().replace(/\.$/, '?'),
                        example_answer: chance.paragraph(),
                        subcategory_id: i
                    });

                    j++;
                }
            }

            return queryInterface.bulkInsert('writing_questions', writingQuestions);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('writing_questions');
    }
};
