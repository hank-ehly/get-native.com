/**
 * account-picture
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('AccountPicture', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        is_silhouette: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        tableName: 'account_pictures',
        underscored: true,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Account);
            }
        }
    });
};