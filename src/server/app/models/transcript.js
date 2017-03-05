/**
 * transcript
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Transcript', {
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        language_code: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    }, {
        tableName: 'transcripts',
        underscored: true,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Video);
                this.hasMany(models.Collocation, {as: 'collocations'});
            }
        }
    });
};