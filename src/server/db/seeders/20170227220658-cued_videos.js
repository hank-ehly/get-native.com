/**
 * 20170227220658-cued_videos
 * get-native.com
 *
 * Created by henryehly on 2017/02/28.
 */

const models  = require('../../app/models');
const Video   = models.Video;
const Account = models.Account;
const chance  = require('chance').Chance();
const Promise = require('bluebird');

module.exports = {
    up: function(queryInterface, Sequelize) {
        const promises = [Video.min('id'), Video.max('id'), Account.min('id'), Account.max('id')];

        return Promise.all(promises).spread((minVideoId, maxVideoId, minAccountId, maxAccountId) => {
            const cuedVideos = [];

            for (let i = minAccountId; i <= maxAccountId; i++) {
                let numCuedVideos = chance.integer({
                    min: 1,
                    max: 10
                });

                for (let j = 0; j < numCuedVideos; j++) {
                    cuedVideos.push({
                        video_id: chance.integer({
                            min: minVideoId,
                            max: maxVideoId
                        }),
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
