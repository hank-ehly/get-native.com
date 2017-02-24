/**
 * 20170224013115-create-account-picture
 * get-native.com
 *
 * Created by henryehly on 2017/01/24.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('account_pictures', {
            account_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'accounts',
                    key: 'id'
                },
                onUpdate: 'restrict',
                onDelete: 'restrict'
            },
            picture_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'pictures',
                    key: 'id'
                },
                onUpdate: 'restrict',
                onDelete: 'restrict'
            }
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('account_pictures');
    }
};
