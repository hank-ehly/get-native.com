/**
 * spec-util
 * get-native.com
 *
 * Created by henryehly on 2017/03/03.
 */

const exec = require('child_process').exec;

module.exports = {
    seedAll: function(done) {
        this.seedAllUndo(function() {
            exec('NODE_ENV=test npm run sequelize db:seed:all', function() {
                done();
            });
        });

    },
    seedAllUndo: function(done) {
        exec('NODE_ENV=test npm run sequelize db:seed:undo:all', function() {
            done();
        });
    }
};
