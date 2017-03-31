/**
 * mailer
 * get-native.com
 *
 * Created by henryehly on 2017/03/26.
 */

const nconf      = require('nconf');
const nodemailer = require('nodemailer');
const k          = require('../keys.json');

const smtpConfig = {
    host: nconf.get(k.SMTP.Host),
    port: nconf.get(k.SMTP.Port),
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
};

const transporter = nodemailer.createTransport(smtpConfig);

module.exports = transporter;
