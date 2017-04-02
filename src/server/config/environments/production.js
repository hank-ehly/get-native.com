/**
 * production
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const nconf = require('nconf');
const k     = require('../keys.json');

nconf.set('allow-origin', 'https://get-native.com');
nconf.set('hostname', 'api.get-native.com');
nconf.set(k.NoReply, 'noreply@get-native.com');
