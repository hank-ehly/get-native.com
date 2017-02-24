/**
 * speaker
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Speaker', {
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        gender: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    }, {
        tableName: 'speakers',
        underscored: true
    });
};
