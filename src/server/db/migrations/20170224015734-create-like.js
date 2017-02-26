/**
 * 20170224015734-create-like
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('likes', {
            video_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'videos',
                    key: 'id'
                },
                onUpdate: 'restrict',
                onDelete: 'restrict'
            },
            account_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'accounts',
                    key: 'id'
                },
                onUpdate: 'restrict',
                onDelete: 'restrict'
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('likes');
    }
};
