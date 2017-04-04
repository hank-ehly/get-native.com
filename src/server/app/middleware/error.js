/**
 * error
 * get-native.com
 *
 * Created by henryehly on 2017/03/13.
 */

const logger = require('../../config/logger');
const config = require('../../config');
const k  = require('../../config/keys.json');

module.exports.logErrors = function(error, req, res, next) {
    logger.info(error, {json: true});
    next(error);
};

module.exports.clientErrorHandler = function(error, req, res, next) {
    if (error.status && error.errors) {
        return res.status(error.status).json(error.errors);
    } else if (error.status && error.body) {
        return res.status(error.status).json({message: error.body.message, code: error.body.code});
    }

    next(error);
};

module.exports.fallbackErrorHandler = function(error, req, res) {
    if (config.get(k.API.ENV) !== k.Env.Production) {
        return res.status(500).send(error.stack);
    }

    return res.status(500);
};
