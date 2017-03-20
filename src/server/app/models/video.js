/**
 * video
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Video', {
        length: DataTypes.INTEGER,
        picture_url: {
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
        associations: function(models) {
            models.Video.belongsTo(models.Speaker, {as: 'speaker'});
            models.Video.belongsTo(models.Subcategory, {as: 'subcategory'});
            models.Video.hasMany(models.CuedVideo, {as: 'cued_videos'});
            models.Video.hasMany(models.Like, {as: 'likes'});
            models.Video.hasMany(models.StudySession, {as: 'study_sessions'});
            models.Video.hasMany(models.Transcript, {as: 'transcripts'});
        }
    });
};
