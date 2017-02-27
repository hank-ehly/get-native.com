/**
 * 20170227213503-videos
 * get-native.com
 *
 * Created by henryehly on 2017/02/28.
 */

const models = require('../../app/models');

const Speaker = models.Speaker;
const Subcategory = models.Subcategory;

const videos = require('../seed-data/videos.json');
const Helper = require('../seed-helper');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Speaker.min('id'), Speaker.max('id'), Subcategory.min('id'), Subcategory.max('id')]).then(x => {
            for (let i = 0; i < videos.length; i++) {
                videos[i].speaker_id = Helper.rand(x[0], x[1]);
                videos[i].subcategory_id = Helper.rand(x[2], x[3]);
            }

            return queryInterface.bulkInsert('videos', videos);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('videos');
    }
};
