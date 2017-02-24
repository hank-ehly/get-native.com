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
        timestamps: false,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Speaker, {
                    foreignKey: 'followers_ibfk_1',
                    targetKey: 'id',
                    as: 'speaker_id'
                });

                this.belongsTo(models.Account, {
                    foreignKey: 'followers_ibfk_2',
                    targetKey: 'id',
                    as: 'account_id'
                });
            }
        }
    });
};
