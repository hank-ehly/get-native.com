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
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.StudySession);
                this.belongsTo(models.WritingQuestion);
            }
        }
    });
};