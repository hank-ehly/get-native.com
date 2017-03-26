/**
 * writing-answer
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('WritingAnswer', {
        answer: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        words_per_minute: DataTypes.INTEGER,
        word_count: DataTypes.INTEGER
    }, {
        tableName: 'writing_answers',
        underscored: true,
        associations: function(models) {
            models.WritingAnswer.belongsTo(models.StudySession, {as: 'study_session'});
            models.WritingAnswer.belongsTo(models.WritingQuestion, {as: 'writing_question'});
        },
        scopes: {
            newestFirst: {
                order: [['created_at', 'DESC']]
            },
            forAccount: function(accountId) {
                return {
                    where: {
                        study_session_id: {
                            $in: sequelize.literal(`(SELECT \`id\` FROM   \`study_sessions\` WHERE  \`account_id\` = ${accountId})`)
                        }
                    }
                };
            },
            since: function(since) {
                if (!since) {
                    return {};
                }

                return {
                    where: {
                        created_at: {
                            $gte: new Date(+since)
                        }
                    }
                }
            },
            maxId: function(maxId) {
                if (!maxId) {
                    return {};
                }

                return {
                    where: {
                        id: {
                            $gte: +maxId
                        }
                    }
                }
            }
        }
    });
};
