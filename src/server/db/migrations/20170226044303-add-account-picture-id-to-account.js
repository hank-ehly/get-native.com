/**
 * 20170226044303-add-account-picture-id-to-account
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('accounts', 'account_picture_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'account_pictures',
                key: 'id'
            },
            onUpdate: 'restrict',
            onDelete: 'restrict'
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('accounts', 'account_picture_id');
    }
};
