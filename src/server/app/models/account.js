/**
 * account
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

const Utility = require('../helpers').Utility;

module.exports = function(sequelize, DataTypes) {
    const Account = sequelize.define('Account', {
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
        },
        is_silhouette_picture: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
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

    Account.existsForEmail = function(email) {
        if (Utility.typeof(email) !== 'string') {
            throw new TypeError(`Argument 'email' must be a string`);
        }

        return Account.count({where: {email: email}}).then(numExistingAccounts => numExistingAccounts !== 0);
    };

    Account.prototype.totalTimeStudied = function() {
        const query = `SELECT SUM(study_time) AS total_time_studied FROM study_sessions WHERE account_id = ${this.id}`;
        return this.sequelize.query(query, {plain: true}).then(result => parseInt(result.total_time_studied));
    };

    Account.prototype.consecutiveStudyDays = function() {
        return 0;
    };

    Account.prototype.totalStudySessions = function() {
        return this.sequelize.models.StudySession.count({where: {account_id: this.id}});
    };

    Account.prototype.longestConsecutiveStudyDays = function() {
        return 0;
    };

    Account.prototype.maximumWords = function() {
        // return this.sequelize.models.WritingAnswer;
        return 0;
    };

    Account.prototype.maximumWPM = function() {
        return 0;
    };

    return Account;
};
