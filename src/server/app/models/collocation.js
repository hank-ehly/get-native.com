/**
 * collocation
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Collocation', {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'collocations',
        underscored: true,
        classMethods: {
            associate: function(models) {
                this.hasMany(models.UsageExample);
                this.belongsTo(models.Transcript);
            }
        }
    });
};