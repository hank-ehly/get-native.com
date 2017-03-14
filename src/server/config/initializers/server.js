/**
 * server
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const nconf = require('nconf');
const routes = require('../routes');
const logger = require('../logger');
const middleware = require('../../app/middleware');

module.exports = () => {
    return new Promise((resolve) => {
        const app = express();

        if (nconf.get('env') === 'development') {
            app.use(morgan('dev'));
        }

        for (let x of ['x-powered-by', 'etag', 'views', 'view cache']) {
            app.disable(x);
        }

        app.use(bodyParser.json());

        app.use(middleware['cors']);
        app.use(middleware['param-validation']);

        app.use(routes);

        app.use(middleware['error']);

        let port = nconf.get('port');
        let server = app.listen(port, () => {
            logger.info(`Listening on port ${port}`);
            resolve(server);
        });
    });
};
