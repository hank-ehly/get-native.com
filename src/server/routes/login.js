/**
 * login
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const router = require('express').Router();

router.post('/login', (req, res) => {
    console.log(req.body['password']);

    res.json(req.body);
});

module.exports = router;
