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
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Speaker);
                this.belongsTo(models.Account);
            }
        }
    });
};
