/**
 * account
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

const Utility = require('../helpers').Utility;
const moment  = require('moment');
const _       = require('lodash');

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

        const query = `
            SELECT EXISTS(
                SELECT id
                FROM accounts 
                WHERE email = ?
            ) AS does_exist
        `;

        return this.sequelize.query(query, {replacements: [email]}).spread(rows => _.first(rows).does_exist);
    };

    Account.prototype.calculateStudySessionStats = function() {
        const query = `
            SELECT
                COALESCE(SUM(study_time), 0) AS total_time_studied,
                COUNT(id)                    AS total_study_sessions
            FROM study_sessions
            WHERE account_id = ?;
        `;

        return this.sequelize.query(query, {replacements: [this.id]}).spread(rows => {
            const result = _.first(rows);
            result.total_time_studied = _.toNumber(result.total_time_studied);
            return result;
        });
    };

    Account.prototype.calculateWritingStats = function() {
        const query = `
            SELECT
                COALESCE(MAX(word_count), 0)       AS maximum_words,
                COALESCE(MAX(words_per_minute), 0) AS maximum_wpm
            FROM writing_answers
            WHERE study_session_id IN (
                SELECT id
                FROM study_sessions
                WHERE account_id = ?
            );
        `;

        return this.sequelize.query(query, {replacements: [this.id]}).spread(_.first);
    };

    Account.prototype.calculateStudyStreaks = function() {
        const query = `
            SELECT
                MAX(DateCol) AS StreakEndDate,
                COUNT(*)     AS Streak
            FROM (
                SELECT
                    DateCol,
                    (@n1 := @n1 + 1) RowNumber
                FROM (
                    SELECT DISTINCT DATE(created_at) AS DateCol
                    FROM study_sessions
                    WHERE account_id = ?
                    ORDER BY DateCol DESC
                ) t, (
                    SELECT @n1 := 0
                ) var
            ) t
            GROUP BY DATE_ADD(DateCol, INTERVAL RowNumber DAY)
            ORDER BY StreakEndDate DESC;
        `;

        return this.sequelize.query(query, {replacements: [this.id]}).spread(rows => {
            const result = {
                consecutive_days: 0,
                longest_consecutive_days: 0
            };

            if (!rows.length) {
                return result;
            }

            result.longest_consecutive_days = _.maxBy(rows, o => o.Streak).Streak;

            const rowOfLastStreakEndDate = _.max(rows, o => o.StreakEndDate);
            const lastStreakEndMoment = moment(rowOfLastStreakEndDate.StreakEndDate);

            if (!lastStreakEndMoment) {
                throw new Error('Invalid date format');
            }

            if (lastStreakEndMoment.isSame(moment(), 'day')) {
                result.consecutive_days = rowOfLastStreakEndDate.Streak;
            }

            return result;
        });
    };

    return Account;
};
