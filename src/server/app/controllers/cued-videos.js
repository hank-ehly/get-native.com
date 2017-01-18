/**
 * cued-videos
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

module.exports.list = (req, res) => {
    let mock = require('../../mock/cued_videos.json');
    res.send(mock);
};
