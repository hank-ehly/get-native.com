/**
 * 20170224013819-create-follower
 * get-native.com
 *
 * Created by henryehly on 2017/01/24.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('followers', {
            speaker_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'speakers',
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
            }
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('followers');
    }
};
