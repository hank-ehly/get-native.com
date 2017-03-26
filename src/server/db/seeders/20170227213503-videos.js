/**
 * 20170227213503-videos
 * get-native.com
 *
 * Created by henryehly on 2017/02/28.
 */

const models      = require('../../app/models');
const Speaker     = models.Speaker;
const Subcategory = models.Subcategory;
const chance      = require('chance').Chance();
const Promise     = require('bluebird');

module.exports = {
    up: function(queryInterface, Sequelize) {
        const promises = [Speaker.min('id'), Speaker.max('id'), Subcategory.min('id'), Subcategory.max('id')];

        return Promise.all(promises).spread((minSpeakerId, maxSpeakerId, minSubcategoryId, maxSubcategoryId) => {
            const videos          = [];
            const numVideos       = ['test', 'circle_ci'].includes(process.env.NODE_ENV) ? 50 : 500;
            const youtubeVideoIds = ['SqyDRXVd5Jo', 'clpOP8f3Jc8', 'q9k_QgYA-bo', 'rF-MsURy9q8', 'W2G68H3xRyE'];

            for (let i = 0; i < numVideos; i++) {
                videos.push({
                    length: chance.integer({
                        min: 30,
                        max: 150
                    }),
                    picture_url: 'https://dummyimage.com/450x300.png/5fa2dd/ffffff',
                    loop_count: chance.integer({
                        min: 10,
                        max: 20000
                    }),
                    video_url: 'https://youtu.be/' + chance.pickone(youtubeVideoIds),
                    description: chance.paragraph(),
                    speaker_id: chance.integer({
                        min: minSpeakerId,
                        max: maxSpeakerId
                    }),
                    language_code: chance.pickone(['en', 'ja']),
                    subcategory_id: chance.integer({
                        min: minSubcategoryId,
                        max: maxSubcategoryId
                    })
                });
            }

            return queryInterface.bulkInsert('videos', videos);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('videos');
    }
};
