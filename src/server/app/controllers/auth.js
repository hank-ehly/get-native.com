/**
 * auth
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

module.exports.login = (req, res) => {
    let mock = require('../../mock/login.json');
    res.send(mock);
};

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
