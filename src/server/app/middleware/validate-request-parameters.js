/**
 * validate-request-parameters
 * get-native.com
 *
 * Created by henryehly on 2017/03/20.
 */

const Joi = require('joi');

const joiOptions = {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    skipFunctions: false,
    stripUnknown: false,
    presence: 'optional',
    noDefaults: false
};

module.exports = function(schema) {
    if (!schema) throw new Error('No schema found!');

    return function(req, res, next) {
        let errors = [];

        ['headers', 'body', 'query', 'params'].forEach(key => {
            if (!schema[key]) return;

            Joi.validate(req[key], schema[key], joiOptions, err => {
                if (err === null) return;

                let details = err.details.map(obj => {
                    return {
                        message: obj.message,
                        path: obj.path
                    };
                });

                errors = errors.concat(details);
            });
        });

        if (errors.length > 0) {
            return next({message: 'Validation Failed', errors: errors});
        }

        return next();
    }
};
