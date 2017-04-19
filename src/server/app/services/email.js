/**
 * email
 * get-native.com
 *
 * Created by henryehly on 2017/04/17.
 */

const Template = require('./template');
const config   = require('../../config');
const k        = require('../../config/keys.json');

const mailer   = require('../../config/initializers/mailer');
const i18n     = require('i18n');
const _        = require('lodash');

module.exports.send = (path, options) => {
    if (!path || !_.isString(path)) {
        throw new Error(`Missing or invalid template path`);
    }

    else if (!options || !_.isPlainObject(options)) {
        throw new Error(`Missing or invalid mailer options`);
    }

    else if (!options.to || !_.isString(options.to)) {
        throw new Error(`Missing or invalid receiver email address`);
    }

    else if (options && options.variables && !_.isPlainObject(options.variables)) {
        throw new Error(`Invalid value for options.variables: ${options.variables}`);
    }

    return Template.create(path, options).then(template => {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return mailer.sendMail({
            subject: _.defaultTo(options.subject, i18n.__(`${path}.title`)),
            from:    _.defaultTo(options.from, config.get(k.NoReply)),
            to:      options.to,
            html:    template
        });
    }).catch(e => {
        // todo
        throw e;
    });
};
