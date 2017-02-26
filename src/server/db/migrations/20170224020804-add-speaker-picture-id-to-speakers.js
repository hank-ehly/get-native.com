/**
 * 20170224020804-add-speaker-picture-id-to-speakers
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('speakers', 'speaker_picture_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'speaker_pictures',
                key: 'speaker_id'
            },
            onUpdate: 'restrict',
            onDelete: 'restrict'
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('speakers', 'speaker_picture_id');
    }
};
