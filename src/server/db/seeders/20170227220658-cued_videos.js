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

            // for each user
            for (let i = x[2]; i < x[3]; i++) {

                // create between 1 ~ 10 cuedVideos
                let numCuedVideos = chance.integer({min: 1, max: 10});
                for (let j = 0; j < numCuedVideos; j++) {

                    // this could result in 1 user having 2+ cued_videos that point to the same video
                    cuedVideos.push({
                        video_id: chance.integer({min: x[0], max: x[1]}),
                        account_id: i
                    });
                }
            }

            return queryInterface.bulkInsert('cued_videos', cuedVideos);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('cued_videos');
    }
};
