/**
 * videos
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

module.exports.list = (req, res) => {
    let mock = require('../../mock/videos.json');
    res.send(mock);
};

module.exports.show = (req, res) => {
    let mock = require('../../mock/video.json');
    res.send(mock);
};

module.exports.like = (req, res) => {
    res.sendStatus(204);
};
