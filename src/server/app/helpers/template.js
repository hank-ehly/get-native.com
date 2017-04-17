/**
 * template
 * get-native.com
 *
 * Created by henryehly on 2017/04/17.
 */

const config = require('../../config');
const k = require('../../config/keys.json');
const _ = require('lodash');

const Promise = require('bluebird');
//noinspection JSUnresolvedFunction
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

module.exports.create = (templateRelPath, options) => {
    if (!templateRelPath) {
        throw new ReferenceError('Missing template path');
    }

    else if (!_.isString(templateRelPath)) {
        throw new TypeError('Template path must be a string');
    }

    else if (options && options.locale && !_.isString(options.locale)) {
        throw new TypeError('Locale must be a string');
    }

    else if (options && options.variables && !_.isPlainObject(options.variables)) {
        throw new TypeError('Variables must be a plain object');
    }

    const templateAbsPath = path.resolve(__dirname, '..', 'templates', templateRelPath + '.html');

    return fs.readFileAsync(templateAbsPath, 'utf8').then(html => {
        const locale            = _.defaultTo(options.locale, config.get(k.DefaultLocale));
        const templateLocaleDir = path.resolve(__dirname, '../../config/locales/templates/', templateRelPath);

        let variables = null;

        try {
            variables = require(path.resolve(templateLocaleDir, locale + '.json'));
        } catch (e) {
            variables = require(path.resolve(templateLocaleDir, config.get(k.DefaultLocale) + '.json'));
        }

        variables = _.clone(variables);

        variables.locale = locale;

        if (options.variables) {
            _.assign(variables, options.variables);
        }

        return _.template(html)(variables);
    }).catch(e => {
        // todo: type of error
        throw new ReferenceError(e);
    });
};
