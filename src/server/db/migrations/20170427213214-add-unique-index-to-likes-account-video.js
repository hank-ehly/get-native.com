/**
 * 20170427213214-add-unique-index-to-likes-account-video
 * get-native.com
 *
 * Created by henryehly on 2017/04/27.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.addIndex('likes', ['account_id', 'video_id'], {
            indicesType: 'UNIQUE'
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeIndex('likes', ['account_id', 'video_id']);
    }
};
