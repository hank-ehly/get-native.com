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

module.exports.writing_history = (req, res) => {
    let mock = require('../../mock/study_writing_history.json');
    res.send(mock);
};
