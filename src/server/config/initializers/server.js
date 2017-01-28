/**
 * server
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

// Todo: Set default error handlers

const express    = require('express');
const bodyParser = require('body-parser');
const routes     = require('../routes');
const logger     = require('../logger');

module.exports = (callback) => {
    const app  = express();
    const cors = require('../cors');

    for (let x of ['x-powered-by', 'etag', 'views', 'view cache']) {
        app.disable(x);
    }

    app.use(bodyParser.json());
    
    app.use(cors);
    app.use(routes);

    // load static resources
    // app.use(express.static(path.join(__dirname, 'public')));

    app.listen(3000, () => {
        logger.info('Listening on port 3000');

        if (callback) callback();
    });
};
