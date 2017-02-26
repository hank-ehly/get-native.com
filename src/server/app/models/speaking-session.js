/**
 * speaking-session
 * get-native.com
 *
 * Created by henryehly on 2017/02/26.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('SpeakingSession', {}, {
        tableName: 'speaking_sessions',
        underscored: true
    });
};