/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

// Redo
    // handle command line args first (if applicable)
    // load OS ENV vars (if applicable) nconf.env();
    // load vars from config/environments (if applicable)
    // initialize database
    // start server

const server = require('./config/initializers/server');

server();

////////// old

// const app        = require('express')();
// const bodyParser = require('body-parser');
//
// const routes     = require('./config/routes');
//
// /* Todo: Create folder for middleware */
//
// /* Todo: What exactly does this do? */
// app.use(bodyParser.json());
//
// /* Todo: Move to separate middleware file */
// app.use((req, res, next) => {
//     res.set('Access-Control-Allow-Origin', '*');
//
//     /* Todo: Clarify difference between Expose & Allow */
//     res.set('Access-Control-Expose-Headers', 'X-GN-Auth-Token');
//     res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
//
//     next();
// });
//
// /* Todo: Move to middleware */
// /* Todo: Cleanup */
// /* Todo: Implement */
// const fs  = require('fs');
// const jwt = require('jsonwebtoken');
// app.use((req, res, next) => {
//
//     if (req.path === '/login') {
//         next();
//         return;
//     }
//
//     let publicKey = fs.readFileSync(`${__dirname}/keys/id_rsa.pem`);
//     let token = req.get('Authorization').split(' ')[1];
//     jwt.verify(token, publicKey, {algorithms: ['RS256']}, (err, decoded) => {
//         if (err) {
//             throw new Error(err);
//         }
//
//         console.log(decoded);
//
//         next();
//     });
// });
//
// app.use(routes);
//
// app.listen(3000, () => {
//     console.log('Listening on port 3000\n');
// });
