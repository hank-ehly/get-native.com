/**
 * writing-session
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('WritingSession', {
        answer: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        words_per_minute: DataTypes.INTEGER,
        word_count: DataTypes.INTEGER
    }, {
        tableName: 'writing_sessions',
        underscored: true,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.StudySession);
            }
        }
    });
};