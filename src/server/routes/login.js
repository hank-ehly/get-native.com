/**
 * login
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const router = require('express').Router();

const jwt    = require('jsonwebtoken');
const fs     = require('fs');

router.post('/login', (req, res) => {

    /* Todo: Validate */
    let email = req.body['email'];
    let password = req.body['password'];
    console.log(email, password);

    let userId = '12345';

    let payload = {
        iss: 'api.get-native.com',
        sub: userId,
        aud: ''
    };

    let privateKey = fs.readFileSync(`${__dirname}/../keys/id_rsa`);

    /* You have to update the jwt on each request */
    jwt.sign(payload, privateKey, {algorithm: 'RS256', expiresIn: '1h'}, (err, token) => {
        if (err) {
            throw new Error(err);
        }

        console.log(token);

        res.set('X-GN-Auth-Token', token);

        res.send('');
    });
});

module.exports = router;
