/**
 * 20170224002531-create-speaker
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('speakers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            gender: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
            location: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ''
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ''
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('speakers');
    }
};
