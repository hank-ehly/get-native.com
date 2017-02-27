/**
 * 20170227220658-cued_videos
 * get-native.com
 *
 * Created by henryehly on 2017/02/28.
 */

const models = require('../../app/models');

const Video = models.Video;
const Account = models.Account;

const chance = require('chance').Chance();

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Video.min('id'), Video.max('id'), Account.min('id'), Account.max('id')]).then(x => {
            const cuedVideos = [];

            for (let i = 0; i < 5000; i++) {
                cuedVideos.push({
                    video_id: chance.integer({min: x[0], max: x[1]}),
                    account_id: chance.integer({min: x[2], max: x[3]})
                });
            }

            return queryInterface.bulkInsert('cued_videos', cuedVideos);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('cued_videos');
    }
};
