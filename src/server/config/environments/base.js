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

nconf.set('env', process.env.NODE_ENV.toLowerCase());

let kPort = k.Port;
nconf.defaults({kPort: 3000});

nconf.set('smtp:host', 'localhost');
nconf.set(`smtp:${k.Port}`, 1025);
nconf.set('allow-origin', '*');
nconf.set(k.NoReply, 'test@email.com');
