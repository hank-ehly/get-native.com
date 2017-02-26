/**
 * study-session
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('StudySession', {
        is_complete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'study_sessions',
        underscored: true,
        classMethods: {
            associate: function(models) {
                this.hasOne(models.ListeningSession);
                this.hasOne(models.ShadowingSession);
                this.hasOne(models.SpeakingSession);
                this.hasOne(models.WritingSession);
                this.belongsTo(models.Account);
                this.belongsTo(models.Video);
            }
        }
    });
};