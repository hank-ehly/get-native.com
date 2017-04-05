/**
 * model
 * get-native.com
 *
 * Created by henryehly on 2017/03/28.
 */

module.exports = (db) => {
    const Utility = require('../helpers').Utility;
    const module  = {};

    module.getFormattedSequelizeDateAttributeForTableColumnTimezoneOffset = function(table, column, timeZoneOffset) {
        const fn  = db.sequelize.fn;
        const col = db.sequelize.col([table, column].join('.'));

        const UTCOffset     = '+00:00';
        const clientOffset  = Utility.browserTimezoneOffsetToSQLFormat(timeZoneOffset);
        const offsetDateCol = fn('CONVERT_TZ', col, UTCOffset, clientOffset);

        const dateHead   = fn('DATE_FORMAT', offsetDateCol, '%a %b %d %H:%i:%S ');
        const dateTail   = fn('DATE_FORMAT', offsetDateCol, ' %Y');
        const dateString = fn('CONCAT', dateHead, clientOffset.replace(':', ''), dateTail);

        return [dateString, column];
    };

    return module;
};
