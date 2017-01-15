/**
 * cued_videos
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const router = require('express').Router();
const mockRes = require('../mock/cued_videos.json');

router.get('/cued_videos', (req, res) => {
    res.send(mockRes);
});

module.exports = router;
