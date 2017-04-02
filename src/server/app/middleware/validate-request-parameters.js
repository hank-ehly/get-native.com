/**
 * validate-request-parameters
 * get-native.com
 *
 * Created by henryehly on 2017/03/20.
 */

const k              = require('../../config/keys.json');
const Joi            = require('joi');
const options        = require('../../config/joi.json');
const GetNativeError = require('../helpers').GetNativeError;

module.exports = function(schema) {
    if (!schema) {
        throw new Error('No schema found!');
    }

    return function(req, res, next) {
        let errors = [];

        if (schema.headers && schema.headers.authorization) {
            Joi.validate(req.headers, schema.headers, options, error => {
                if (error === null) {
                    return;
                }

                error.details.forEach(d => {
                    if (d.path === 'authorization') {
                        return next({
                            status: 401,
                            body: new GetNativeError(k.Error.Auth, d.message)
                        });
                    }
                });
            });
        }

        ['headers', 'body', 'query', 'params'].forEach(key => {
            if (!schema[key]) {
                return;
            }

            Joi.validate(req[key], schema[key], options, error => {
                if (error === null) {
                    return;
                }

                let details = error.details.map(obj => {
                    return new GetNativeError(k.Error.RequestParam, obj.message);
                });

                errors = errors.concat(details);
            });
        });

        if (errors.length > 0) {
            return next({
                status: 400,
                errors: errors
            });
        }

        return next();
    }
};
