/**
 * template
 * get-native.com
 *
 * Created by henryehly on 2017/04/17.
 */

const config  = require('../../config');
const k       = require('../../config/keys.json');
const _       = require('lodash');

const Promise = require('bluebird');
const fs      = Promise.promisifyAll(require('fs'));
const path    = require('path');
const i18n    = require('i18n');

module.exports.create = (templateRelPath, options) => {
    if (!templateRelPath) {
        throw new ReferenceError('Missing template path');
    }

    else if (!_.isString(templateRelPath)) {
        throw new TypeError('Template path must be a string');
    }

    else if (options && options.variables && !_.isPlainObject(options.variables)) {
        throw new TypeError('Variables must be a plain object');
    }

    const templateAbsPath = path.resolve(__dirname, '..', 'templates', templateRelPath + '.html');

    // todo: Support txt for crappy clients
    return fs.readFileAsync(templateAbsPath, 'UTF8').then(html => {
        const catalog = _.clone(i18n.getCatalog(i18n.getLocale()));
        return _.template(html)(_.assign(catalog, options.variables));
    }).catch(e => {
        // todo: type of error
        throw new ReferenceError(e);
    });
};
