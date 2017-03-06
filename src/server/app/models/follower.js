/**
 * follower
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Follower', {}, {
        tableName: 'followers',
        underscored: true,
        associations: function(models) {
            models.Follower.belongsTo(models.Speaker);
            models.Follower.belongsTo(models.Account);
        }
    });
};
