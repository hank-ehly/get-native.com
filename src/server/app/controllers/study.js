/**
 * study
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

module.exports.stats = (req, res) => {
    let mock = require('../../mock/study_stats.json');
    res.send(mock);
};

module.exports.writing_answers = (req, res) => {
    let mock = require('../../mock/study_writing_answers.json');
    res.send(mock);
};
