/**
 * mailer
 * get-native.com
 *
 * Created by henryehly on 2017/03/26.
 */

const config     = require('../index');
const k          = require('../keys.json');

const nodemailer = require('nodemailer');
const _          = require('lodash');

const smtpConfig = {
    host: config.get(k.SMTP.Host),
    port: config.get(k.SMTP.Port),
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
};

if (!_.includes([k.Env.Development, k.Env.Test, k.Env.CircleCI], config.get(k.NODE_ENV))) {
    smtpConfig.dkim = {
        domainName: config.get(k.Client.Host),
        keySelector: 'mail',
        privateKey: config.get(k.DKIMPrivateKey)
    }
}

const transporter = nodemailer.createTransport(smtpConfig);

module.exports = transporter;
