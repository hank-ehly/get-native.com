/**
 * login
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    res.send('LOGIN\n');
});

module.exports = router;
