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
        associations: function(models) {
            models.StudySession.belongsTo(models.Account);
            models.StudySession.belongsTo(models.Video);
            models.StudySession.hasOne(models.WritingAnswer);
        }
    });
};