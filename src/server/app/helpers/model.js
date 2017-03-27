/**
 * model
 * get-native.com
 *
 * Created by henryehly on 2017/03/28.
 */

module.exports = (db) => {
    return {
        getFormattedDateAttrForTableColumn(table, column) {
            return _getFormattedDateForTableColumn(db, table, column);
        }
    }
};

function _getFormattedDateForTableColumn(db, table, column) {
    const fn  = db.sequelize.fn;
    const col = db.sequelize.col([table, column].join('.'));

    const timeZone   = fn('TIME_FORMAT', fn('TIMEDIFF', fn('NOW'), fn('UTC_TIMESTAMP')), '%H%i');
    const dateHead   = fn('DATE_FORMAT', col, '%a %b %d %H:%i:%S +');
    const dateTail   = fn('DATE_FORMAT', col, ' %Y');
    const dateString = fn('CONCAT', dateHead, timeZone, dateTail);

    return [dateString, column];
}
