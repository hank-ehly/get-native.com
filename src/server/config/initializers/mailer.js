/**
 * mailer
 * get-native.com
 *
 * Created by henryehly on 2017/03/26.
 */

const nodemailer = require('nodemailer');
const config     = require('../index');
const k          = require('../keys.json');

const smtpConfig = {
    host: config.get(k.SMTP.Host),
    port: config.get(k.SMTP.Port),
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
//     dkim: { TODO
//         domainName: 'example.com',
//         keySelector: '2017',
//         privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...'
//     }
};

const transporter = nodemailer.createTransport(smtpConfig);

module.exports = transporter;
