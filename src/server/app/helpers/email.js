/**
 * email
 * get-native.com
 *
 * Created by henryehly on 2017/04/17.
 */

const config  = require('../../config');
const k       = require('../../config/keys.json');

const Promise = require('bluebird');
const mailer  = require('../../config/initializers/mailer');
//noinspection JSUnresolvedFunction
const fs      = Promise.promisifyAll(require('fs'));
const _       = require('lodash');

module.exports.send = (templateKey, options) => {
    if (!templateKey || !options) {
        throw new ReferenceError(`Template key or Mailer options missing`);
    }

    //noinspection JSUnresolvedFunction
    if (!_.isString(templateKey) || !_.isPlainObject(options)) {
        throw new TypeError(`Template key or Mailer options is incorrect type`);
    }

    const locale        = require(__dirname + '/../../config/locales/' + 'en' + '.json');
    const templatesPath = __dirname + '/../templates/';

    //noinspection JSUnresolvedFunction
    return Promise.all([
        fs.readFileAsync(templatesPath + 'welcome.txt'),
        fs.readFileAsync(templatesPath + 'welcome.html')
    ]).spread((text, html) => {
        //noinspection JSUnresolvedFunction
        const templates = _.mapValues({text: text, html: html}, (value) => {
            //noinspection JSUnresolvedFunction,JSUnresolvedVariable
            return _.template(value.toString())({
                lang: locale,
                title: locale.templates.welcome.title,
                instructions: locale.templates.welcome.instructions,
                confirmationLinkLabel: locale.templates.welcome.confirmationLinkLabel,

                // todo: timed expiry link? resend link?
                confirmationLinkUrl: 'https://hankehly.com',
                footer: locale.templates.welcome.footer
            });
        });

        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return mailer.sendMail({
            from:    _.defaultTo(options.from, config.get(k.NoReply)),
            to:      options.to,
            subject: _.defaultTo(options.subject, locale.templates.welcome.title),
            text:    templates.text,
            html:    templates.html
        });
    }).catch(e => {
        throw e; // todo
    });
};
