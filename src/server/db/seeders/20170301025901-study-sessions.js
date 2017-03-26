/**
 * 20170301025901-study-sessions
 * get-native.com
 *
 * Created by henryehly on 2017/03/01.
 */

const chance  = require('chance').Chance();
const models  = require('../../app/models');
const Promise = require('bluebird');
const Account = models.Account;
const Video   = models.Video;

module.exports = {
    up: function(queryInterface, Sequelize) {
        const promises = [Account.min('id'), Account.max('id'), Video.min('id'), Video.max('id')];

        return Promise.all(promises).spread((minAccountId, maxAccountId, minVideoId, maxVideoId) => {
            const studySessions = [];

            for (let i = minAccountId; i < maxAccountId; i++) {
                let numStudySessions = chance.integer({
                    min: 1,
                    max: 365
                });

                for (let j = 0; j < numStudySessions; j++) {
                    studySessions.push({
                        video_id: chance.integer({
                            min: minVideoId,
                            max: maxVideoId
                        }),
                        account_id: i,
                        study_time: chance.integer({
                            min: 300,
                            max: 1200
                        })
                    });
                }
            }

            return queryInterface.bulkInsert('study_sessions', studySessions);
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('study_sessions');
    }
};
