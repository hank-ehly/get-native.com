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

    const locale    = _.defaultTo(options.locale, config.get(k.DefaultLocale));

    const variables = require(__dirname + '/../../config/locales/' + locale + '.json');

    const templateOptions = {locale: locale};

    if (options && options.variables) {
        templateOptions.variables = options.variables;
    }

    return Template.create(path, templateOptions).then(template => {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return mailer.sendMail({
            // todo: localized subject
            subject: _.defaultTo(options.subject, variables.title),
            from:    _.defaultTo(options.from, config.get(k.NoReply)),
            to:      options.to,
            html:    template
        });
    }).catch(e => {
        // todo
        throw e;
    });
};
