/**
 * staging
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const k = require('../keys.json');

const config = {};

config[k.Header.AccessControlAllowOrigin] = 'https://stg.get-native.com';
config[k.API.Hostname] = 'stg.api.get-native.com';
config[k.SMTP.Port] = 25;

module.exports = config;
