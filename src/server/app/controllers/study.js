/**
 * study
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const db              = require('../models');
const ModelHelper     = require('../helpers').Model(db);
const WritingAnswer   = db.WritingAnswer;
const WritingQuestion = db.WritingQuestion;
const ResponseWrapper = require('../helpers').ResponseWrapper;
const AuthHelper      = require('../helpers').Auth;
const k               = require('../../config/keys.json');
const logger          = require('../../config/logger');

module.exports.stats = (req, res) => {
    let mock = require('../../mock/study_stats.json');
    res.send(mock);
};

module.exports.writing_answers = (req, res, next) => {
    const accountId = AuthHelper.extractAccountIdFromRequest(req);
    const createdAt = ModelHelper.getFormattedDateAttrForTableColumn(k.Model.WritingAnswer, k.Attr.CreatedAt);

    WritingAnswer.scope('newestFirst', {method: ['forAccount', accountId]}, {method: ['since', req.query.since]}, {method: ['maxId', req.query.max_id]}).findAll({
        attributes: [k.Attr.Id, k.Attr.Answer, createdAt, k.Attr.StudySessionId],
        include: [{model: WritingQuestion, as: 'writing_question', attributes: ['text']}],
        limit: 10
    }).then(answers => {
        const answersAsJson = ResponseWrapper.wrap(answers.map(a => a.get({plain: true})));
        res.send(answersAsJson);
    }).catch(e => {
        logger.info(e, {json: true});

        next({
            message: 'Error',
            errors: [{message: e}]
        });
    });
};
