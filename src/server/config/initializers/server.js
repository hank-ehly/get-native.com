/**
 * server
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

// Todo: Set default error handlers

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const nconf = require('nconf');
const routes = require('../routes');
const logger = require('../logger');
const ev = require('express-validation');

module.exports = () => {
    return new Promise((resolve) => {
        const app = express();

        if (nconf.get('env') === 'development') {
            app.use(morgan('dev'));
        }

        const cors = require('../cors');

        for (let x of ['x-powered-by', 'etag', 'views', 'view cache']) {
            app.disable(x);
        }

        app.use(bodyParser.json());

        app.use(cors);
        app.use(routes);

        app.use(logErrors);
        app.use(clientErrorHandler);
        app.use(fallbackErrorHandler);

        let port = nconf.get('PORT');
        let server = app.listen(port, () => {
            logger.info(`Listening on port ${port}`);
            resolve(server);
        });
    });
};

function logErrors(err, req, res, next) {
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (err instanceof ev.ValidationError) {
        return res.status(err.status).json(err);
    }
}

function fallbackErrorHandler(err, req, res, next) {
    next(err);
}
