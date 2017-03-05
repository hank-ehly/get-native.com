/**
 * spec-util
 * get-native.com
 *
 * Created by henryehly on 2017/03/03.
 */

const request = require('supertest');
const exec = require('child_process').exec;

module.exports = {
    seedAll: function(done) {
        this.seedAllUndo(function() {
            exec('npm run sequelize db:seed:all', function() {
                done();
            });
        });
    },

    seedAllUndo: function(done) {
        exec('npm run sequelize db:seed:undo:all', function() {
            done();
        });
    },

    login: function(cb) {
        delete require.cache[require.resolve('../index')];

        require('../index').then(function(_) {
            server = _;

            request(_).post('/login').send({
                email: 'test@email.com',
                password: 'test_password'
            }).then(function(response) {
                cb(_, 'Bearer: ' + response.header['x-gn-auth-token']);
            });
        });
    }
};
