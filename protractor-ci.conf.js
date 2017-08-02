/**
 * protractor-ci.conf
 * get-native.com
 *
 * Created by henryehly on 2017/08/02.
 */

const config = require('./protractor.conf').config;

config.capabilities = {
    browserName: 'chrome',
    chromeOptions: {
        args: ['--no-sandbox']
    }
};

exports.config = config;
