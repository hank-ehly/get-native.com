/**
 * 20170228222502-likes
 * get-native.com
 *
 * Created by henryehly on 2017/03/01.
 */

const models  = require('../../app/models');
const chance  = require('chance').Chance();

const Video   = models.Video;
const Account = models.Account;

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Video.min('id'), Video.max('id'), Account.min('id'), Account.max('id')]).then(x => {
            const likes = [];

            // for each user
            for (let i = x[2]; i < x[3]; i++) {

                // picker N unique videos
                let numVideoIds = chance.integer({min: 1, max: 20});
                let videoIds = chance.unique(chance.integer, numVideoIds, {min: x[0], max: x[1]});

                // the user likes each of those videos
                for (let j = 0; j < videoIds.length; j++) {
                    likes.push({
                        account_id: i,
                        video_id: videoIds[j]
                    });
                }
            }

            return queryInterface.bulkInsert('likes', likes);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('likes');
    }
};
