/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const app        = require('express')();
const bodyParser = require('body-parser');

const routes     = require('./routes');

/* Todo: Is this necessary */
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Expose-Headers', 'Authorization');
    next();
});

const fs = require('fs');
const jwt = require('jsonwebtoken');
app.use((req, res, next) => {

    if (req.path === '/login') {
        next();
        return;
    }

    let publicKey = fs.readFileSync(`${__dirname}/keys/id_rsa.pem`);
    let token = req.get('Authorization').split(' ')[1];
    jwt.verify(token, publicKey, {algorithms: ['RS256']}, (err, decoded) => {
        if (err) {
            throw new Error(err);
        }

        console.log(decoded);

        next();
    });
});

app.use(routes);

app.listen(3000, () => {
    console.log('Listening on port 3000\n');
});
