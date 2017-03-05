/**
 * account
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Account', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        browser_notifications_enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        email_notifications_enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        email_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        default_study_language_code: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'en'
        },
        picture_url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    }, {
        tableName: 'accounts',
        underscored: true,
        classMethods: {
            associate: function(models) {
                this.hasMany(model.Follower);
                this.hasMany(model.Notification);
                this.hasMany(model.CuedVideo);
                this.hasMany(model.Like);
                this.hasMany(model.StudySession);
            }
        }
    });
};