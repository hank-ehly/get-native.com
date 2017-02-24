/**
 * 20170223224209-create-subcategory
 * get-native.com
 *
 * Created by henryehly on 2017/01/24.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('subcategories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            category_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'categories',
                    key: 'id'
                },
                onUpdate: 'restrict',
                onDelete: 'restrict'
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ''
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
        return queryInterface.dropTable('subcategories');
    }
};
