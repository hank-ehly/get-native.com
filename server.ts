/**
 * server
 * getnativelearning.com
 *
 * Created by henryehly on 2018/02/25.
 */

import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import * as locale from 'locale';

const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');

enableProdMode();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const LOCALES = ['en', 'ja'];

const engine = ngExpressEngine({
    bootstrap: require('./dist/server/main.bundle').AppServerModuleNgFactory,
    providers: [provideModuleMap(require('./dist/server/main.bundle').LAZY_MODULE_MAP)]
});

const app = express();
app.use(locale(LOCALES, 'en'));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

LOCALES.forEach(loc => {
    app.get(`/${loc}(/*)?`, (req, res) => {
        res.render(join(DIST_FOLDER, 'browser', loc, 'index.html'), {
            req, res, engine: engine
        });
    });
});

app.get('*', (req, res) => {
    res.redirect([req.locale, req.url].join('').replace(/\/+/g, '/'));
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
