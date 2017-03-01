'use strict';

const chance = require('chance').Chance();
const models = require('../../app/models');

const Account = models.Account;
const Video = models.Video;

module.exports = {
    up: function(queryInterface, Sequelize) {
        return Promise.all([Account.min('id'), Account.max('id'), Video.min('id'), Video.max('id')]).then(x => {
            const studySessions = [];

            // for each user
            for (let i = x[0]; i < x[1]; i++) {

                // create N study sessions with min/max video_id
                let numStudySessions = chance.integer({min: 0, max: 365});

                for (let j = 0; j < numStudySessions; j++) {

                    studySessions.push({
                        video_id: chance.integer({min: x[2], max: x[3]}),
                        account_id: i,
                        study_time: chance.integer({min: 300, max: 1200})
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
