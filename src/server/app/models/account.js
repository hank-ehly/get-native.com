/**
 * account
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

const Utility = require('../helpers').Utility;
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

        // todo: use EXISTS
        return Account.count({where: {email: email}}).then(numExistingAccounts => numExistingAccounts !== 0);
    };

    Account.prototype.calculateStudySessionStats = function() {
        return this.sequelize.query(`
            SELECT
                COALESCE(SUM(study_time), 0) AS total_time_studied,
                COUNT(id)                    AS total_study_sessions
            FROM study_sessions
            WHERE account_id = ?;
        `, {replacements: [this.id]}).spread(result => {
            result = _.first(result);
            result.total_time_studied = _.toNumber(result.total_time_studied);
            return result;
        });
    };

    Account.prototype.calculateWritingStats = function() {
        return this.sequelize.query(`
            SELECT
                COALESCE(MAX(word_count), 0)       AS maximum_words,
                COALESCE(MAX(words_per_minute), 0) AS maximum_wpm
            FROM writing_answers
            WHERE study_session_id IN (
                SELECT id
                FROM study_sessions
                WHERE account_id = ?
            );
        `, {replacements: [this.id]}).spread(_.first);
    };

    Account.prototype.calculateStudyStreaks = function() {
        return this.sequelize.query(`
            SELECT
                MAX(DateCol) AS EndStreak,
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
            ORDER BY EndStreak DESC;
        `, {replacements: [this.id]}).spread(r => {
            let res = {consecutive_days: 0, longest_consecutive_days: 0};

            if (r.length === 0) {
                return res;
            }

            let longestStreakRow = _.maxBy(r, o => o.Streak);
            res.longest_consecutive_days = longestStreakRow.Streak;

            let latestEndStreakRow = _.max(r, o => o.EndStreak);
            // if the max date is today, get the streak from that row
            let dateString = latestEndStreakRow.EndStreak;
            let date = new Date(dateString);

            let now = new Date();
            let thisYear = now.getFullYear();
            let thisMonth = now.getMonth();
            let today = now.getDate();

            if (date.getFullYear() === thisYear && date.getMonth() === thisMonth && date.getDate() === today) {
                res.consecutive_days = latestEndStreakRow.Streak;
            }

            return res;
        });
    };

    return Account;
};
