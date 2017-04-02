/**
 * base
 * get-native.com
 *
 * Created by henryehly on 2017/01/30.
 */

const nconf = require('nconf');
const fs    = require('fs');
const k     = require('../keys.json');

const secretsDir = __dirname + '/../secrets';

const publicKey = fs.readFile(secretsDir + '/id_rsa.pem', (err, data) => {
    if (err) throw new Error(err);
    nconf.set(k.PublicKey, data.toString());
});

const privateKey = fs.readFile(secretsDir + '/id_rsa', (err, data) => {
    if (err) throw new Error(err);
    nconf.set(k.PrivateKey, data.toString());
});

nconf.set(k.Env.Key, process.env.NODE_ENV.toLowerCase());
nconf.set(k.APIPort, 3000);
nconf.set(k.SMTP.Host, 'localhost');
nconf.set(k.SMTP.Port, 1025);
nconf.set(k.Header.AllowOrigin, '*');
nconf.set(k.NoReply, 'noreply@localhost');
