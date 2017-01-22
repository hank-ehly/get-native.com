/**
 * cors
 * get-native.com
 *
 * Created by henryehly on 2017/01/22.
 */

const express = require('express');
const router  = express.Router();

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'X-GN-Auth-Token, X-GN-Auth-Expire'
};

router.use((req, res, next) => {
    res.set(corsHeaders);
    next();
});

module.exports = router;
