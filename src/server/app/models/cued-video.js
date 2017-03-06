/**
 * cued-video
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('CuedVideo', {}, {
        tableName: 'cued_videos',
        underscored: true,
        associations: function(models) {
            models.CuedVideo.belongsTo(models.Account);
            models.CuedVideo.belongsTo(models.Video);
        }
    });
};
