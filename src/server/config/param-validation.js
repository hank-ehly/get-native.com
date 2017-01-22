/**
 * param-validation
 * get-native.com
 *
 * Created by henryehly on 2017/01/22.
 */

const Joi = require('joi');

module.exports = {
    auth: {
        login: {
            body: {
                email: Joi.string().email().required(),
                password: Joi.string().required()
            }
        }
    }
};
