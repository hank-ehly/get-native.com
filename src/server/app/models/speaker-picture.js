/**
 * speaker-picture
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('SpeakerPicture', {}, {
        tableName: 'speaker_pictures',
        underscored: true,
        timestamps: false,
        classMethods: {
            associate: function(models) {
                this.belongsTo(models.Speaker, {
                    foreignKey: 'speaker_pictures_speakers_id_fk',
                    targetKey: 'id',
                    as: 'speaker_id'
                });

                this.belongsTo(models.Picture, {
                    foreignKey: 'speaker_pictures_pictures_id_fk',
                    targetKey: 'id',
                    as: 'picture_id'
                });
            }
        }
    });
};
