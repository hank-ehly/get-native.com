/**
 * study-stats
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const router = require('express').Router();

/* Todo: Implement */
const mock   = require('../mock/study_stats.json');

router.get('/study_stats', (req, res) => {
    res.send(mock);
});

module.exports = router;
