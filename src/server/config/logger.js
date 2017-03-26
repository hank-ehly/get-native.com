/**
 * logger
 * get-native.com
 *
 * Created by henryehly on 2017/01/22.
 */

const winston = require('winston');
const nconf   = require('nconf');

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
    if (!nconf.get('debug')) {
        return (['test', 'circle_ci'].includes(nconf.get('env')) ? 'error' : 'debug');
    }

    return 'debug';
}

logger.transports.console.level = _getConsoleLevel();

module.exports = logger;
