/**
 * account-picture
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('AccountPicture', {}, {
        tableName: 'account_pictures',
        underscored: true,
        timestamps: false,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Account, {
                    foreignKey: 'account_pictures_accounts_id_fk',
                    targetKey: 'id',
                    as: 'account_id'
                });

                this.belongsTo(models.Picture, {
                    foreignKey: 'account_pictures_pictures_id_fk',
                    targetKey: 'id',
                    as: 'picture_id'
                });
            }
        }
    });
};
