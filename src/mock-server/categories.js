/**
 * categories
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const router = require('express').Router();
const mockRes = require('./mock-responses/categories.json');

router.get('/categories', (req, res) => {
    res.send(mockRes);
});

module.exports = router;
