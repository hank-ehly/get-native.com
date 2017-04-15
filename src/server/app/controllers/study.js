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
const Account         = db.Account;
const Promise         = require('bluebird');
const _               = require('lodash');

module.exports.stats = (req, res, next) => {
    const accountId = AuthHelper.extractAccountIdFromRequest(req);

    Account.findById(accountId).then(a => {
        return Promise.all([
            a.calculateStudySessionStatsForLanguage(req.params.lang),
            a.calculateWritingStatsForLanguage(req.params.lang),
            a.calculateStudyStreaks()
        ]);
    }).spread((studySessionStats, writingStats, studyStreakStats) => {
        res.status(200).send({
            lang: req.params.lang,
            total_time_studied: studySessionStats.total_time_studied,
            consecutive_days: studyStreakStats.consecutive_days,
            total_study_sessions: studySessionStats.total_study_sessions,
            longest_consecutive_days: studyStreakStats.longest_consecutive_days,
            maximum_words: writingStats.maximum_words,
            maximum_wpm: writingStats.maximum_wpm
        });
    }).catch(next);
};

module.exports.writing_answers = (req, res, next) => {
    const accountId = AuthHelper.extractAccountIdFromRequest(req);
    const createdAt = ModelHelper.getFormattedSequelizeDateAttributeForTableColumnTimezoneOffset(k.Model.WritingAnswer, k.Attr.CreatedAt, req.query.time_zone_offset);

    WritingAnswer.scope([
        'newestFirst', {method: ['forAccountWithLang', accountId, req.params.lang]}, {method: ['since', req.query.since]}, {method: ['maxId', req.query.max_id]}
    ]).findAll({
        attributes: [k.Attr.Id, k.Attr.Answer, createdAt, k.Attr.StudySessionId],
        include: [
            {
                model: WritingQuestion,
                as: 'writing_question',
                attributes: ['text']
            }
        ],
        limit: 10
    }).then(answers => {
        const answersAsJson = ResponseWrapper.wrap(answers.map(a => {
            let json = a.get({plain: true});
            json.lang = req.params.lang;
            return json;
        }));

        console.log(_.first(answersAsJson.records));

        res.send(answersAsJson);
    }).catch(next);
};
