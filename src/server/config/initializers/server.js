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

        // load static resources
        // app.use(express.static(path.join(__dirname, 'public')));

        let port = nconf.get('PORT');
        app.listen(port, () => {
            logger.info(`Listening on port ${port}`);
            resolve(app);
        });
    });
};
