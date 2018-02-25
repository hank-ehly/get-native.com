/**
 * server
 * getnativelearning.com
 *
 * Created by henryehly on 2018/02/25.
 */

import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as locale from 'locale';
import * as _ from 'lodash';

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
    },
    {
        id: 'ja',
        engine: ngExpressEngine({
            bootstrap: require('main.server.ja').AppServerModuleNgFactory,
            providers: [provideModuleMap(require('main.server.ja').LAZY_MODULE_MAP)]
        })
    }
];

const app = express();
app.use(locale([_.map(LOCALES, 'id')], 'en'));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

LOCALES.forEach(lc => {
    app.get(`/${lc.id}(/*)?`, (req, res) => {
        res.render(join(DIST_FOLDER, 'browser', lc.id, 'index.html'), {req, res, engine: lc.engine});
    });
});

app.get('*', (req, res) => {
    res.redirect([req.locale, req.url].join('').replace(/\/+/g, '/'));
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
