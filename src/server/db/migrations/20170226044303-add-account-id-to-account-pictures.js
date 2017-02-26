/**
 * 20170226044303-add-account-id-to-account-picture
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addColumn('account_pictures', 'account_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'accounts',
                key: 'id'
            },
            onUpdate: 'restrict',
            onDelete: 'restrict'
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn('account_pictures', 'account_id');
    }
};
