/**
 * listening-session
 * get-native.com
 *
 * Created by henryehly on 2017/02/26.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ListeningSession', {}, {
        tableName: 'listening_sessions',
        underscored: true,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.StudySession);
            }
        }
    });
};