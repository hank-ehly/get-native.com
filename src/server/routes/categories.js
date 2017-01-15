/**
 * categories
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const router  = require('express').Router();

/* Todo: Implement */
const mock    = require('../mock/categories.json');

router.get('/categories', (req, res) => {
    res.send(mock);
});

module.exports = router;
