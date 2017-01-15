/**
 * study-stats
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const router = require('express').Router();
const mockRes = require('../mock/study_stats.json');

router.get('/study_stats', (req, res) => {
    res.send(mockRes);
});

module.exports = router;
