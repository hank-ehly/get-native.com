#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const _ = require('lodash');
const path = require('path');

const hashRegExp = /[0-9A-Za-z]{32,}/g;
const localesDir = path.resolve(__dirname, '..', 'src', 'locales');

async function diff(a, b) {
    const aText = await readFile(path.resolve(localesDir, `messages.${a}.xlf`), 'utf8');
    const bText = await readFile(path.resolve(localesDir, `messages.${b}.xlf`), 'utf8');

    const difference = _.difference(aText.match(hashRegExp), bText.match(hashRegExp));

    console.log(`Diff ${a}:${b}`);
    console.log(util.inspect(difference, null));
}

if (process.argv.length < 4) {
    return console.log('Example: i18n-diff.js en ja');
}

return diff(process.argv[2], process.argv[3]);