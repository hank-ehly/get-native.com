/**
 * auth
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const logger = require('../../config/logger');

module.exports.login = (req, res) => {
    logger.info(req.body);
    let mock = require('../../mock/login.json');

    authorizeResponse(res);

    res.send(mock);
};

module.exports.authenticate = (req, res, next) => {
    let authHeader = req.get('Authorization');

    if (!authHeader) {
        throw new Error('No Authorization provided.');
    }

    let reqToken = authHeader.split(' ')[1];

    if (!reqToken) {
        throw new Error('No token provided.');
    }

    authorizeResponse(res);

    next();
};

function authorizeResponse(res) {
    // jwt logic
    res.set('X-GN-Auth-Token', 'DEVELOPMENT.JWT.TOKEN');
    res.set('X-GN-Auth-Expire', (Date.now() + (1000 * 60 * 60)).toString());
}

////////// old

// const router  = require('express').Router();
//
// /* Todo: Implement */
// const mock    = require('../mock/login.json');
//
// const jwt     = require('jsonwebtoken');
// const fs      = require('fs');
//
// router.post('/login', (req, res) => {
//
//     /* Todo: Validate */
//     console.log(req.body);
//     let email = req.body['email'];
//     let password = req.body['password'];
//     console.log(email, password);
//
//     let userId = '12345';
//
//     let payload = {
//         iss: 'api.get-native.com',
//         sub: userId,
//         aud: ''
//     };
//
//     let privateKey = fs.readFileSync(`${__dirname}/../keys/id_rsa`);
//
//     /* You have to update the jwt on each request */
//     jwt.sign(payload, privateKey, {algorithm: 'RS256', expiresIn: '1h'}, (err, token) => {
//         if (err) {
//             throw new Error(err);
//         }
//
//         console.log(token);
//
//         res.set('X-GN-Auth-Token', token);
//
//         res.json(mock);
//     });
// });
//
// module.exports = router;
