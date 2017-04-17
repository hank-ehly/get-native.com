/**
 * verification-token
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

const Utility = require('../helpers').Utility;
const _       = require('lodash');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('VerificationToken', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        expiration_date: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        tableName: 'verification_tokens',
        underscored: true,
        associations: function(models) {
            models.VerificationToken.belongsTo(models.Account);
        }
    });
};
