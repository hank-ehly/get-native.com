/**
 * seed-helper
 * get-native.com
 *
 * Created by henryehly on 2017/02/27.
 */

module.exports = {
    rand: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};
