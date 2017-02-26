/**
 * 20170226060631-speaker-pictures
 * get-native.com
 *
 * Created by henryehly on 2017/02/26.
 */

let speaker_pictures = require('../seed-data/speaker-pictures.json');
let Speaker = require('../../app/models').Speaker;

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Speaker.min('id'), Speaker.max('id')]).then((v) => {
            for (let i = v[0], j = 0; i < v[1]; i++, j++) {
                speaker_pictures[j].speaker_id = i;
            }
            return queryInterface.bulkInsert('speaker_pictures', speaker_pictures);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('speaker_pictures');
    }
};
