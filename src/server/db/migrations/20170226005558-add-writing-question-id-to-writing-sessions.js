/**
 * 20170226005558-add-writing-question-id-to-writing-sessions
 * get-native.com
 *
 * Created by henryehly on 2017/02/26.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('writing_sessions', 'writing_question_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'writing_questions',
                key: 'id'
            },
            onUpdate: 'restrict',
            onDelete: 'restrict'
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('writing_sessions', 'writing_question_id');
    }
};
