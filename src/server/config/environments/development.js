/**
 * development
 * get-native.com
 *
 * Created by henryehly on 2017/03/20.
 */

const nconf = require('nconf');
const k     = require('../keys.json');

nconf.set(k.API.Hostname, 'localhost');
