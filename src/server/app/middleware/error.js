/**
 * error
 * get-native.com
 *
 * Created by henryehly on 2017/03/13.
 */

const express = require('express');
const router = express.Router();
const logger = require('../../config/logger');
const nconf = require('nconf');

module.exports.logErrors = function(err, req, res, next) {
    logger.info(err, {json: true});
    next(err);
};

module.exports.clientErrorHandler = function(err, req, res, next) {
    if (err.errors && err.errors.length > 0) {
        return res.status(422).json(err);
    } else if (err.message) {
        return res.status(400).json(err);
    }

    next(err);
};

module.exports.fallbackErrorHandler = function(err, req, res, next) {
    if (nconf.get('env') !== 'production') {
        return res.status(500).send(err.stack);
    }

    return res.status(500);
};
