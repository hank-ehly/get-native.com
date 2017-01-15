/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const app = require('express')();

const routes = require('./routes');

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.use(routes);

app.listen(3000, () => {
    console.log('Listening on port 3000\n');
});
