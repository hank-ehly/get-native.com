/**
 * study-session
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('StudySession', {
        study_time: DataTypes.INTEGER
    }, {
        tableName: 'study_sessions',
        underscored: true,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Account);
                this.belongsTo(models.Video);
                this.hasOne(models.WritingAnswer);
            }
        }
    });
};