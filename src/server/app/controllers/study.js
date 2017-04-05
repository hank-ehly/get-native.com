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

module.exports.stats = (req, res, next) => {
    const accountId = AuthHelper.extractAccountIdFromRequest(req);

    Account.findById(accountId).then(account => {
        Promise.all([
            account.totalTimeStudied(),
            account.consecutiveStudyDays(),
            account.totalStudySessions(),
            account.longestConsecutiveStudyDays(),
            account.maximumWords(),
            account.maximumWPM()
        ]).spread((tts, cd, tss, lcd, mw, mwpm) => {
            res.status(200).send({
                lang: req.params.lang,
                total_time_studied: tts,
                consecutive_days: cd,
                total_study_sessions: tss,
                longest_consecutive_days: lcd,
                maximum_words: mw,
                maximum_wpm: mwpm
            });
        }).catch(next);
    }).catch(next);
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
