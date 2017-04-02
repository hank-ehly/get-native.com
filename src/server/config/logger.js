/**
 * logger
 * get-native.com
 *
 * Created by henryehly on 2017/01/22.
 */

const winston = require('winston');
const nconf   = require('nconf');
const k       = require('./keys.json');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: () => new Date().toTimeString(),
            formatter: (options) => {
                return `[${options.timestamp()}][${options.level.toUpperCase()}] ${options.message}`;
            }
        })
    ]
});

function _getConsoleLevel() {
    if (nconf.get(k.Debug)) {
        return 'debug';
    }

    return ([k.Env.Test, k.Env.CircleCI].includes(nconf.get(k.API.ENV)) ? 'error' : 'debug');
}

logger.transports.console.level = _getConsoleLevel();

module.exports = logger;
