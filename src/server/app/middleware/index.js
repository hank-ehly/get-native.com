/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/03/13.
 */

const fs = require('fs');
const path = require('path');

let middleware = {};

fs.readdirSync(__dirname).filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== path.basename(module.filename)) && (file.slice(-3) === '.js');
}).forEach((file) => {
    let fileNameNoExt = file.substring(0, file.length - 3);
    middleware[fileNameNoExt] = require(path.join(__dirname, file));
});

module.exports = middleware;
