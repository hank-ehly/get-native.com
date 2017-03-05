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

logger.transports.console.level = (['test', 'circle_ci'].includes(nconf.get('env')) ? 'error' : 'debug');

module.exports = logger;
