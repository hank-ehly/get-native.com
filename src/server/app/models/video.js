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
        }
    }, {
        tableName: 'videos',
        underscored: true,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Subcategory);
                this.belongsTo(models.Speaker);
                this.hasOne(models.Transcript);
                this.hasOne(models.WritingQuestion);
                this.hasMany(models.Like);
                this.hasMany(models.StudySession);
                this.hasMany(models.CuedVideo);
            }
        }
    });
};
