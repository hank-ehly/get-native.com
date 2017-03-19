/**
 * 20170227213503-videos
 * get-native.com
 *
 * Created by henryehly on 2017/02/28.
 */

const models = require('../../app/models');

const Speaker = models.Speaker;
const Subcategory = models.Subcategory;

const chance = require('chance').Chance();

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Speaker.min('id'), Speaker.max('id'), Subcategory.min('id'), Subcategory.max('id')]).then(x => {
            const videos = [];

            let numVideos = ['test', 'circle_ci'].includes(process.env.NODE_ENV) ? 50 : 500;

            for (let i = 0; i < numVideos; i++) {
                videos.push({
                    length: chance.integer({min: 30, max: 150}),
                    picture_url: 'https://dummyimage.com/450x300.png/5fa2dd/ffffff',
                    loop_count: chance.integer({min: 10, max: 20000}),
                    video_url: 'https://youtu.be/' + chance.pickone(['SqyDRXVd5Jo', 'clpOP8f3Jc8', 'q9k_QgYA-bo', 'rF-MsURy9q8', 'W2G68H3xRyE']),
                    description: chance.paragraph(),
                    speaker_id: chance.integer({min: x[0], max: x[1]}),
                    language_code: chance.pickone(['en', 'ja']),
                    subcategory_id: chance.integer({min: x[2], max: x[3]})
                });
            }

            return queryInterface.bulkInsert('videos', videos);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('videos');
    }
};
