/**
 * subcategories
 * get-native.com
 *
 * Created by henryehly on 2017/05/03.
 */

const k               = require('../../config/keys.json');
const WritingQuestion = require('../models')[k.Model.WritingQuestion];
const GetNativeError  = require('../services')['GetNativeError'];

const _               = require('lodash');

module.exports.writingQuestions = (req, res, next) => {
    const conditions = {
        where: {
            subcategory_id: req.params[k.Attr.Id]
        }
    };

    if (req.query.count) {
        conditions.limit = +req.query.count;
    }

    return WritingQuestion.findAll(conditions).then(questions => {
        const questionsAsJson = _.map(questions, q => q.get({plain: true}));
        const responseObject = _.zipObject(['records', 'count'], [questionsAsJson, questionsAsJson.length]);
        res.send(responseObject);
    }).catch(e => {
        console.log(e);
        next(e);
    });
};
