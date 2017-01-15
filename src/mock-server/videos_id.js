/**
 * videos_id
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const router = require('express').Router();
const mockRes = require('./mock-responses/video.json');

router.get('/videos/:id', (req, res) => {
    res.send(mockRes);
});

module.exports = router;
