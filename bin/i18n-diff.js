#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const _ = require('lodash');
const path = require('path');

const hashRegExp = /[0-9A-Za-z]{32,}/g;
const srcDir = path.resolve(__dirname, '..', 'src');

async function diff(locale) {
    try {
        const baseText = await readFile(path.resolve(srcDir, 'messages.xlf'), 'utf8');
        const localeText = await readFile(path.resolve(srcDir, 'locales', `messages.${locale}.xlf`), 'utf8');

        const difference = _.difference(baseText.match(hashRegExp), localeText.match(hashRegExp));

        if (difference.length) {
            console.log(`Missing from ${locale}:`);
            console.log(util.inspect(difference, null));
        } else {
            console.log(`${locale} is up to date!`);
        }
    } catch (e) {
        console.log(e);
    }
}

if (process.argv.length < 3) {
    return console.log('Example: i18n-diff.js en');
}

return diff(process.argv[2]);