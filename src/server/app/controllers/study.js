/**
 * study
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const services        = require('../services');
const ResponseWrapper = services.ResponseWrapper;
const Auth            = services.Auth;
const db              = require('../models');
const ModelService    = services.Model(db);
const WritingAnswer   = db.WritingAnswer;
const WritingQuestion = db.WritingQuestion;
const Account         = db.Account;
const GetNativeError  = services.GetNativeError;
const k               = require('../../config/keys.json');

const Promise         = require('bluebird');

module.exports.stats = (req, res, next) => {
    Account.findById(req.accountId).then(account => {
        if (!account) {
            throw new GetNativeError(k.Error.AccountMissing);
        }

        const sessionStats = account.calculateStudySessionStatsForLanguage(req.params.lang);
        const writingStats = account.calculateWritingStatsForLanguage(req.params.lang);
        const studyStreaks = account.calculateStudyStreaksForLanguage(req.params.lang);

        return Promise.join(sessionStats, writingStats, studyStreaks, (sessions, writing, streaks) => {
            res.status(200).send({
                lang: req.params.lang,
                total_time_studied: sessions.total_time_studied,
                consecutive_days: streaks.consecutive_days,
                total_study_sessions: sessions.total_study_sessions,
                longest_consecutive_days: streaks.longest_consecutive_days,
                maximum_words: writing.maximum_words,
                maximum_wpm: writing.maximum_wpm
            });
        }).catch(Promise.reject);
    }).catch(next);
};

module.exports.writing_answers = (req, res, next) => {
    const createdAt = ModelService.getDateAttrForTableColumnTZOffset(k.Model.WritingAnswer, k.Attr.CreatedAt, req.query.time_zone_offset);

    WritingAnswer.scope([
        'newestFirst',
        {method: ['forAccountWithLang', req.accountId, req.params.lang]},
        {method: ['since', req.query.since]},
        {method: ['maxId', req.query.max_id]}
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

        res.send(answersAsJson);
    }).catch(next);
};
