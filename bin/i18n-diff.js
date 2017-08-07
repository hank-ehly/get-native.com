#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const _ = require('lodash');
const path = require('path');

const hashRegExp = /[0-9A-Za-z]{32,}/g;
const sourceRegExp = new RegExp('<source>(.|\n)*?</source>', 'g');
const srcDir = path.resolve(__dirname, '..', 'src');

async function diff(locale) {
    try {
        const baseXlf = await readFile(path.resolve(srcDir, 'messages.xlf'), 'utf8');
        const localeXlf = await readFile(path.resolve(srcDir, 'locales', `messages.${locale}.xlf`), 'utf8');

        const hashDiff = _.difference(baseXlf.match(hashRegExp), localeXlf.match(hashRegExp));
        const sourceDiff = _.difference(baseXlf.match(sourceRegExp), localeXlf.match(sourceRegExp));

        if (hashDiff.length) {
            console.log('• MISSING KEYS');
            console.log('+----------------------------------+');
            for (const key of hashDiff) {
                console.log(`| ${key} |`);
            }
            console.log('+----------------------------------+');
        }

        if (sourceDiff.length) {
            console.log('• TEXT DIFFERENCES');
            for (let i = 0; i < sourceDiff.length; i++) {
                let item = sourceDiff[i];
                console.log(`(${_.padStart(i, 2, '0')}) ${item}`);
            }
        }

        if (!hashDiff.length && !sourceDiff.length) {
            console.log('+-------------------+');
            console.log(`| ${locale} is up to date! |`);
            console.log('+-------------------+');
        }
    } catch (e) {
        console.log(e);
    }
}

if (process.argv.length < 3) {
    return console.log('Example: i18n-diff.js en');
}

return diff(process.argv[2]);

// todo: check contents of <source> to make sure they are the same as the base xlf file
