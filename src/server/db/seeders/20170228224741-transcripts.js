/**
 * 20170228224741-transcripts
 * get-native.com
 *
 * Created by henryehly on 2017/03/01.
 */

const models = require('../../app/models');
const chance = require('chance').Chance();

const Video = models.Video;
const Language = models.Language;

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Video.min('id'), Video.max('id'), Language.findAll({attributes: ['code']})]).then(x => {
            const transcripts = [];

            // for each video
            for (let i = x[0]; i < x[1]; i++) {

                // for each language code
                for (let j = 0; j < x[2].length; j++) {

                    // create a transcript
                    transcripts.push({
                        text: chance.paragraph() + chance.paragraph(),
                        video_id: i,
                        language_code: x[2][j].code
                    });
                }
            }

            return queryInterface.bulkInsert('transcripts', transcripts);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('transcripts');
    }
};
