/**
 * cors
 * get-native.com
 *
 * Created by henryehly on 2017/01/22.
 */

const express = require('express');
const nconf   = require('nconf');
const logger  = require('../../config/logger');
const router  = express.Router();

const corsHeaders = {
    'Access-Control-Allow-Origin': nconf.get('allow-origin'),
    'Access-Control-Expose-Headers': 'X-GN-Auth-Token, X-GN-Auth-Expire',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',

    // 安全ではないメソッドが、コントロールの対象となります。（PUT, DELETE など）
    // 単純なメソッドは、常に許可されます。（GET, POST, HEAD, OPTIONS など）
    'Access-Control-Allow-Methods': 'PATCH'
};

logger.info(`Set response header: 'Access-Control-Allow-Origin': '${nconf.get('allow-origin')}'`);

router.use((req, res, next) => {
    res.set(corsHeaders);
    next();
});

module.exports = router;
