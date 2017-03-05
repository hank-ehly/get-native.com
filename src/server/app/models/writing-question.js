/**
 * writing-question
 * get-native.com
 *
 * Created by henryehly on 2017/02/26.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('WritingQuestion', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        example_answer: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'writing_questions',
        underscored: true,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Subcategory);
                this.hasMany(models.WritingAnswer);
            }
        }
    });
};