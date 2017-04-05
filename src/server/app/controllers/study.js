/**
 * study
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const ResponseWrapper = require('../helpers').ResponseWrapper;
const AuthHelper      = require('../helpers').Auth;
const k               = require('../../config/keys.json');
const logger          = require('../../config/logger');
const db              = require('../models');
const ModelHelper     = require('../helpers').Model(db);
const WritingAnswer   = db.WritingAnswer;
const WritingQuestion = db.WritingQuestion;

module.exports.stats = (req, res) => {
    res.status(200).send({
        lang: 'en',
        total_time_studied: 0,
        consecutive_days: 0,
        total_study_sessions: 0,
        longest_consecutive_days: 0,
        maximum_words: 0,
        maximum_wpm: 0
    });
};

module.exports.writing_answers = (req, res, next) => {
    const accountId = AuthHelper.extractAccountIdFromRequest(req);
    const createdAt = ModelHelper.getFormattedSequelizeDateAttributeForTableColumnTimezoneOffset(k.Model.WritingAnswer, k.Attr.CreatedAt, req.query.time_zone_offset);

    WritingAnswer.scope('newestFirst', {method: ['forAccount', accountId]}, {method: ['since', req.query.since]}, {method: ['maxId', req.query.max_id]}).findAll({
        attributes: [k.Attr.Id, k.Attr.Answer, createdAt, k.Attr.StudySessionId],
        include: [{model: WritingQuestion, as: 'writing_question', attributes: ['text']}],
        limit: 10
    }).then(answers => {
        const answersAsJson = ResponseWrapper.wrap(answers.map(a => a.get({plain: true})));
        res.send(answersAsJson);
    }).catch(next);
};
