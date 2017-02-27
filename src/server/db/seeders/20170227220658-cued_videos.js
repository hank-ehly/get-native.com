/**
 * 20170227220658-cued_videos
 * get-native.com
 *
 * Created by henryehly on 2017/02/28.
 */

const models = require('../../app/models');

const Video = models.Video;
const Account = models.Account;

const Helper = require('../seed-helper');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Video.min('id'), Video.max('id'), Account.min('id'), Account.max('id')]).then(x => {
            const cuedVideos = [];
            const numCuedVideos = 5000;

            for (let i = 0; i < numCuedVideos; i++) {
                cuedVideos.push({video_id: Helper.rand(x[0], x[1]), account_id: Helper.rand(x[2], x[3])});
            }

            return queryInterface.bulkInsert('cued_videos', cuedVideos);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('cued_videos');
    }
};
