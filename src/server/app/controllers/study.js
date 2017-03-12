/**
 * study
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const models = require('../models');
const WritingAnswer = models.WritingAnswer;
const WritingQuestion = models.WritingQuestion;

module.exports.stats = (req, res) => {
    let mock = require('../../mock/study_stats.json');
    res.send(mock);
};

module.exports.writing_answers = (req, res) => {
    WritingAnswer.findAll({
        where: {},
        attributes: ['id', 'answer', 'created_at'],
        include: [
            {
                model: WritingQuestion,
                as: 'writing_question',
                attributes: ['text']
            }
        ],
        limit: 10
    }).then(answers => {
        let response = {
            count: answers.length,
            records: answers
        };

        res.send(response);
    }).catch(error => {
        res.send(error);
    });
};
