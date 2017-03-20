/**
 * study
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const models = require('../models');
const WritingAnswer = models.WritingAnswer;
const WritingQuestion = models.WritingQuestion;
const ResponseWrapper = require('../helpers').ResponseWrapper;

module.exports.stats = (req, res) => {
    let mock = require('../../mock/study_stats.json');
    res.send(mock);
};

// todo: you're returning other users' writing answers!!
module.exports.writing_answers = (req, res) => {
    const conditions = {};

    if (req.query.max_id) {
        conditions.id = {
            $gte: +req.query.max_id
        };
    }

    if (req.query.since) {
        conditions.created_at = {
            $gte: new Date(+req.query.since)
        };
    }

    WritingAnswer.findAll({
        where: conditions,
        attributes: ['id', 'answer', 'created_at'],
        include: [{model: WritingQuestion, as: 'writing_question', attributes: ['text']}],
        limit: 10
    }).then(answers => {
        let answersAsJson = answers.map(a => a.toJSON());
        let wrappedResponse = ResponseWrapper.wrap(answersAsJson);
        res.send(wrappedResponse);
    });
};
