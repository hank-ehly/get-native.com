/**
 * like
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Like', {}, {
        tableName: 'likes',
        underscored: true,
        updatedAt: false
    });
};