/**
 * base
 * get-native.com
 *
 * Created by henryehly on 2017/01/30.
 */

const nconf = require('nconf');
const fs = require('fs');

const secretsDir = __dirname + '/../secrets';

let publicKey = fs.readFile(secretsDir + '/id_rsa.pem', (err, data) => {
    if (err) {
        throw new Error(err);
    }

    nconf.set('publicKey', data.toString());
});

let privateKey = fs.readFile(secretsDir + '/id_rsa', (err, data) => {
    if (err) {
        throw new Error(err);
    }

    nconf.set('privateKey', data.toString());
});

nconf.set('PORT', 3000);
