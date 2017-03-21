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

    const conditions = {
        study_session_id: {
            $in: models.sequelize.literal(`(SELECT \`id\` FROM \`study_sessions\` WHERE \`account_id\` = ${accountId})`)
        }
    };

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
        attributes: ['id', 'answer', 'created_at', 'study_session_id'],
        include: [{model: WritingQuestion, as: 'writing_question', attributes: ['text']}],
        limit: 10
    }).then(answers => {
        let answersAsJson = answers.map(a => a.toJSON());
        let wrappedResponse = ResponseWrapper.wrap(answersAsJson);
        res.send(wrappedResponse);
    }).catch(e => {
       console.log(e); // todo
    });
};
