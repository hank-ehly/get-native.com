/**
 * categories
 * get-native.com
 *
 * Created by henryehly on 2017/03/02.
 */

const request = require('supertest');
const assert  = require('assert');
const util  = require('./spec-util');

describe('/categories', function() {
    let server = null;
    let authorization = null;

    before(function(done) {
        this.timeout(0);
        util.seedAll(done);
    });

    beforeEach(function(done) {
        delete require.cache[require.resolve('../index')];

        require('../index').then(function(_) {
            server = _;

            const message = {
                email: 'test@email.com',
                password: 'test_password'
            };

            request(_).post('/login').send(message).then(res => {
                authorization = 'Bearer: ' + res.header['x-gn-auth-token'];
                done();
            });
        });
    });

    afterEach(function(done) {
        server.close(done);
    });

    after(function(done) {
        this.timeout(0);
        util.seedAllUndo(done);
    });

    it('should return a 200 response', function(done) {
        request(server).get('/categories').set('authorization', authorization)
            .expect(200, done);
    });

    it('should contain a top-level \'count\' property', function() {
        return request(server).get('/categories').set('authorization', authorization).then(function(res) {
            assert(res.body.hasOwnProperty('count'));
        });
    });
});
