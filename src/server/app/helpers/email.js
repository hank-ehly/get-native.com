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

module.exports.send = (templatePath, options) => {
    if (!templatePath || !options) {
        throw new ReferenceError(`Template path or Mailer options missing`);
    }

    //noinspection JSUnresolvedFunction
    if (!_.isString(templatePath) || !_.isPlainObject(options)) {
        throw new TypeError(`Template path or Mailer options is incorrect type`);
    }

    const locale        = require(__dirname + '/../../config/locales/' + 'en' + '.json');
    const templatesPath = __dirname + '/../templates/' + templatePath + '.html';

    //noinspection JSUnresolvedFunction
    return fs.readFileAsync(templatesPath).then(html => {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        const template = _.template(html.toString())({
            lang: locale,
            title: locale.templates.welcome.title,
            instructions: locale.templates.welcome.instructions,
            confirmationLinkLabel: locale.templates.welcome.confirmationLinkLabel,

            // todo: timed expiry link? resend link?
            confirmationLinkUrl: 'https://hankehly.com',
            footer: locale.templates.welcome.footer
        });


        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return mailer.sendMail({
            from:    _.defaultTo(options.from, config.get(k.NoReply)),
            to:      options.to,
            subject: _.defaultTo(options.subject, locale.templates.welcome.title),
            html:    template
        });
    }).catch(e => {
        throw e; // todo
    });
};
