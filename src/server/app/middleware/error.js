/**
 * error
 * get-native.com
 *
 * Created by henryehly on 2017/03/13.
 */

const express = require('express');
const router  = express.Router();
const logger  = require('../../config/logger');
const ev      = require('express-validation');

module.exports.logErrors = function(err, req, res, next) {
    next(err);
};

module.exports.clientErrorHandler = function(err, req, res, next) {

    // todo: remove dependency on express-validation
    if (err instanceof ev.ValidationError) {
        return res.status(422).json(err);
    }

    next(err);
};

module.exports.fallbackErrorHandler = function(err, req, res, next) {
    next(err);
};
