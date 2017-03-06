/**
 * subcategory
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Subcategory', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    }, {
        tableName: 'subcategories',
        underscored: true,
        associations: function(models) {
            models.Subcategory.belongsTo(models.Category);
            models.Subcategory.hasMany(models.Video, {as: 'videos'});
            models.Subcategory.hasMany(models.WritingQuestion, {as: 'writing_questions'});
        }
    });
};
