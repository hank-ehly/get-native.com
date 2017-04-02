/**
 * staging
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const nconf = require('nconf');
const k     = require('../keys.json');

nconf.set('allow-origin', 'https://stg.get-native.com');
nconf.set('hostname', 'stg.api.get-native.com');
nconf.set(k.NoReply, 'noreply@stg.get-native.com');
