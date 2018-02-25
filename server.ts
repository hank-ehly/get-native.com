/**
 * server
 * getnativelearning.com
 *
 * Created by henryehly on 2018/02/25.
 */

import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import * as locale from 'locale';
import { join } from 'path';
import { readFileSync } from 'fs';

enableProdMode();

const app = express();
app.use(locale(['en', 'en_US', 'ja'], 'en'));

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const englishTemplate = readFileSync(join(DIST_FOLDER, 'browser', 'en', 'index.html')).toString();
const japaneseTemplate = readFileSync(join(DIST_FOLDER, 'browser', 'ja', 'index.html')).toString();

function templateForLocale(lc) {
    return lc === 'ja' ? japaneseTemplate : englishTemplate;
}

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main.bundle');
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', (_, options, callback) => {
    renderModuleFactory(AppServerModuleNgFactory, {
        document: templateForLocale(options.req.locale),
        url: options.req.url,
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    }).then(html => {
        callback(null, html);
    });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render(join(DIST_FOLDER, 'browser', 'index.html'), {req});
});

app.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
});
