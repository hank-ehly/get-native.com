/**
 * 20170226010211-add-video-id-to-writing-questions
 * get-native.com
 *
 * Created by henryehly on 2017/02/26.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('writing_questions', 'video_id', { // video_id is used as the key name
            type: Sequelize.INTEGER,
            references: {
                model: 'videos',
                key: 'id'
            },
            onUpdate: 'restrict',
            onDelete: 'restrict'
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('writing_questions', 'video_id');
    }
};
