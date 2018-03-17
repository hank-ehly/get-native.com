/**
 * server
 * getnative.org
 *
 * Created by henryehly on 2018/02/25.
 */

import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';
import * as express from 'express';
import { join } from 'path';

const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');

enableProdMode();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const LOCALES = [
    {
        id: 'en',
        engine: ngExpressEngine({
            bootstrap: require('main.server.en').AppServerModuleNgFactory,
            providers: [provideModuleMap(require('main.server.en').LAZY_MODULE_MAP)]
        })
    }, {
        id: 'ja',
        engine: ngExpressEngine({
            bootstrap: require('main.server.ja').AppServerModuleNgFactory,
            providers: [provideModuleMap(require('main.server.ja').LAZY_MODULE_MAP)]
        })
    }
];

const app = express();

app.engine('html', (filePath, options, callback) => {
    options.engine(filePath, {req: options.req, res: options.res}, callback);
});

app.set('view engine', 'html');

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

LOCALES.forEach(_locale => {
    app.get(`/${_locale.id}(/*)?`, (req, res) => {
        res.render(join(DIST_FOLDER, 'browser', _locale.id, 'index.html'), {req, res, engine: _locale.engine});
    });
});

app.get('*', (req, res) => {
    res.redirect(['/en', req.url].join('').replace(/\/+/g, '/'));
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
