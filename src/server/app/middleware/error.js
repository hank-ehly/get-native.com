/**
 * error
 * get-native.com
 *
 * Created by henryehly on 2017/03/13.
 */

const router  = require('express').Router();
const ev      = require('express-validation');

// log errors
router.use((err, req, res, next) => {
    next(err);
});

// client error handler
router.use((err, req, res, next) => {
    if (err instanceof ev.ValidationError) {
        return res.status(err.status).json(err);
    }

    next(err);
});

// fallback error handler
router.use((err, req, res, next) => {
    next(err);
});

module.exports = router;
