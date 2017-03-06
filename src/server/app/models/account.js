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
        associations: function(models) {
            models.Account.hasMany(models.Follower, {as: 'followers'});
            models.Account.hasMany(models.Notification, {as: 'notifications'});
            models.Account.hasMany(models.CuedVideo, {as: 'cued_videos'});
            models.Account.hasMany(models.Like, {as: 'likes'});
            models.Account.hasMany(models.StudySession, {as: 'study_sessions'});
        }
    });
};