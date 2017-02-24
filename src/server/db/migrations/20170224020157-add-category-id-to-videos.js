/**
 * 20170224020157-add-category-id-to-videos
 * get-native.com
 *
 * Created by henryehly on 2017/01/24.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('videos', 'category_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'categories',
                key: 'id'
            },
            onUpdate: 'restrict',
            onDelete: 'restrict'
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('videos', 'category_id');
    }
};
