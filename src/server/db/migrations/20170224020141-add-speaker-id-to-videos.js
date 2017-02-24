/**
 * 20170224020141-add-speaker-id-to-videos
 * get-native.com
 *
 * Created by henryehly on 2017/01/24.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('videos', 'speaker_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'speakers',
                key: 'id'
            },
            onUpdate: 'restrict',
            onDelete: 'restrict'
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('videos', 'speaker_id');
    }
};
