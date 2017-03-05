/**
 * video
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Video', {
        length: DataTypes.INTEGER,
        thumbnail_image_url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        loop_count: DataTypes.INTEGER,
        video_url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        language_code: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    }, {
        tableName: 'videos',
        underscored: true,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Speaker);
                this.belongsTo(models.Subcategory);
                this.hasMany(models.CuedVideo, {as: 'cued_videos'});
                this.hasMany(models.Like, {as: 'likes'});
                this.hasMany(models.StudySession, {as: 'study_sessions'});
                this.hasOne(models.Transcript);
            }
        }
    });
};
