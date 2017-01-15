/**
 * videos
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const router = require('express').Router();
const mockRes = require('../mock/videos.json');

router.get('/videos', (req, res) => {
    res.send(mockRes);
});

module.exports = router;
