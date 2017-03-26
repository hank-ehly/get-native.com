/**
 * mailer
 * get-native.com
 *
 * Created by henryehly on 2017/03/26.
 */

const nconf      = require('nconf');
const nodemailer = require('nodemailer');

const smtpConfig = {
    host: nconf.get('smtp').host,
    port: nconf.get('smtp').port,
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
};

const transporter = nodemailer.createTransport(smtpConfig);

module.exports = transporter;
