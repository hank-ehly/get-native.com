/**
 * utility
 * get-native.com
 *
 * Created by henryehly on 2017/03/14.
 */

module.exports = {
    typeof: (x) => {
        return Object.prototype.toString.call(x).replace(/[\[\]]/g, '').split(' ')[1].toLowerCase();
    }
};
