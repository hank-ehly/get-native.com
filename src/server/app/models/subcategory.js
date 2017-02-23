/**
 * subcategory
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Subcategory', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    }, {
        tableName: 'subcategories',
        underscored: true,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Category, {
                    foreignKey: 'subcategories_ibfk_1',
                    targetKey: 'id',
                    as: 'category_id'
                });
            }
        }
    });
};
