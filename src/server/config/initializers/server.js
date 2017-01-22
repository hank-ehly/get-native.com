/**
 * server
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

// Todo:
// configure middleware
// set whatever error handlers

const express    = require('express');
const bodyParser = require('body-parser');
const routes     = require('../routes');
const cors       = require('../cors');
const logger     = require('../logger');

module.exports = (callback) => {
    const app = express();

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
