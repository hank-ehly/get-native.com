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
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Account);
                this.hasOne(models.Video); // is this accurate?
            }
        }
    });
};
