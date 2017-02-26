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
        }
    }, {
        tableName: 'transcripts',
        underscored: true,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Language); // this may be better as lang-code instead. You don't need to call Language.all.transcripts
                this.belongsTo(models.Video);
                this.hasMany(models.Collocation);
            }
        }
    });
};