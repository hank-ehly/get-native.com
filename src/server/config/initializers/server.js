/**
 * server
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const nconf      = require('nconf');
const routes     = require('../routes');
const logger     = require('../logger');
const middleware = require('../../app/middleware');
const Promise    = require('bluebird');
const k          = require('../keys.json');

module.exports = () => {
    const app = express();

    if (nconf.get('env') === 'development') {
        app.use(morgan('dev'));
    }

    for (let x of ['x-powered-by', 'etag', 'views', 'view cache']) {
        app.disable(x);
    }

    app.use(bodyParser.json());
    app.use(middleware.Cors);
    app.use(routes);

    app.use(middleware.Error.logErrors);
    app.use(middleware.Error.clientErrorHandler);
    app.use(middleware.Error.fallbackErrorHandler);

    return new Promise(resolve => {
        const port = nconf.get(k.APIPort);
        resolve(app.listen(port, () => logger.info(`Listening on port ${port}`)));
    });
};
