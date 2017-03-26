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
const AuthHelper      = require('../helpers').Auth;

module.exports.stats = (req, res) => {
    let mock = require('../../mock/study_stats.json');
    res.send(mock);
};

module.exports.writing_answers = (req, res) => {
    const accountId = AuthHelper.extractAccountIdFromRequest(req);

    WritingAnswer.scope('newestFirst', {method: ['forAccount', accountId]}, {method: ['since', req.query.since]}, {method: ['maxId', req.query.max_id]}).findAll({
        attributes: ['id', 'answer', 'created_at', 'study_session_id'],
        include: [{model: WritingQuestion, as: 'writing_question', attributes: ['text']}],
        limit: 10
    }).then(answers => {
        const answersAsJson = ResponseWrapper.wrap(answers.map(a => a.get({plain: true})));
        res.send(answersAsJson);
    }).catch(() => {
        next({
            message: 'Error',
            errors: [{message: `Failed to process search conditions: ${req.query}`}]
        });
    });
};
