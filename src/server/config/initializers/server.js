/**
 * server
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

// Todo:
// configure middleware
// set whatever error handlers

const express = require('express');
const routes = require('../routes');

module.exports = (callback) => {
    const app = express();

    app.use(routes);

    // load static resources
    // app.use(express.static(path.join(__dirname, 'public')));

    app.listen(3000, () => {
        console.log('Listening on port 3000\n');

        if (callback) callback();
    });
};
