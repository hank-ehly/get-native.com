/**
 * 20170301094402-writing-answers
 * get-native.com
 *
 * Created by henryehly on 2017/03/01.
 */

const chance = require('chance').Chance();
const models = require('../../app/models');

const StudySession = models.StudySession;
const WritingQuestion = models.WritingQuestion;

module.exports = {

    // Todo: Allocation failed - JavaScript heap out of memory
    up: function(queryInterface, Sequelize) {
        return Promise.all([StudySession.min('id'), StudySession.max('id'), WritingQuestion.min('id'), WritingQuestion.max('id')]).then(x => {
            const writingAnswers = [];

            // for each study session
            for (let i = x[0]; i < x[1]; i++) {

                // create one writing answer
                let answerText = chance.paragraph();
                writingAnswers.push({
                    answer: answerText,
                    words_per_minute: chance.integer({min: 30, max: 50}),
                    word_count: answerText.length,
                    study_session_id: i,
                    writing_question_id: chance.integer({min: x[2], max: x[3]})
                });
            }

            return queryInterface.bulkInsert('writing_answers', writingAnswers);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('writing_answers');
    }
};
