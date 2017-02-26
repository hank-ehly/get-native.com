/**
 * 20170224000651-create-video
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('videos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            length: Sequelize.INTEGER,
            thumbnail_image_url: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ''
            },
            loop_count: Sequelize.INTEGER,
            video_url: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ''
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('videos');
    }
};
