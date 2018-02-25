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
import * as _ from 'lodash';

// const locale = require('locale');

const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');

enableProdMode();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const LOCALES = _.map(['en', 'ja'], loc => {
    return {
        id: loc,
        engine: ngExpressEngine({
            bootstrap: require(`./dist/server/${loc}/main.bundle`).AppServerModuleNgFactory,
            providers: [provideModuleMap(require(`./dist/server/${loc}/main.bundle`).LAZY_MODULE_MAP)]
        })
    };
});

const app = express();
// app.use(locale(_.map(LOCALES, 'id'), 'en'));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

LOCALES.forEach(loc => {
    app.get(`/${loc.id}(/*)?`, (req, res) => {
        res.render(join(DIST_FOLDER, 'browser', loc.id, 'index.html'), {
            req, res, engine: loc.engine
        });
    });
});

app.get('*', (req, res) => {
    res.redirect(['en', req.url].join('').replace(/\/+/g, '/'));
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
