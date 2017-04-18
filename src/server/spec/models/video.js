/**
 * video
 * get-native.com
 *
 * Created by henryehly on 2017/04/16.
 */

const assert   = require('assert');
const SpecUtil = require('../spec-util');
const Promise  = require('bluebird');
const db       = require('../../app/models');
const Video    = db.Video;
const Account  = db.Account;
const _        = require('lodash');

describe('video', function() {
    let account = null;
    let server = null;

    before(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAll(), SpecUtil.startMailServer()]);
    });

    beforeEach(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return SpecUtil.login().then(function(initGroup) {
            server  = initGroup.server;
            account = initGroup.response.body;
        });
    });

    afterEach(function(done) {
        server.close(done);
    });

    after(function() {
        this.timeout(SpecUtil.defaultTimeout);
        return Promise.all([SpecUtil.seedAllUndo(), SpecUtil.stopMailServer()]);
    });

    describe('cuedAndMaxId', function() {
        it(`should only return cued videos whose ids are less than the max id`, function() {
            return Video.findAll({attributes: ['id']}).then(function(videos) {
                const midVideoId = videos[Math.floor(videos.length / 2)].id;
                const cued = Video.getCuedAttributeForAccountId(account.id);
                return Video.scope({method: ['cuedAndMaxId', true, account.id, midVideoId]}).findAll({attributes: {include: [cued]}})
                    .then(function(videos) {
                        _.forEach(videos, function(video) {
                            assert(_.lt(video.get('id'), midVideoId));
                            assert.equal(video.get('cued'), true);
                        });
                    });
            });
        });

        it(`should return videos whose ids are less than the max id`, function() {
            return Video.findAll({attributes: ['id']}).then(function(videos) {
                const midVideoId = videos[Math.floor(videos.length / 2)].id;
                const cued = Video.getCuedAttributeForAccountId(account.id);
                return Video.scope({method: ['cuedAndMaxId', false, account.id, midVideoId]}).findAll({attributes: {include: [cued]}})
                    .then(function(videos) {
                        assert(_.lt(_.first(videos).id, midVideoId));
                    });
            });
        });

        it(`should return videos`, function() {
            const cued = Video.getCuedAttributeForAccountId(account.id);
            return Video.scope({method: ['cuedAndMaxId', false, account.id]}).findAll({attributes: {include: [cued]}})
                .then(function(videos) {
                    assert(_.gt(videos.length, 0));
                });
        });

        it(`should only return cued videos`, function() {
            const cued = Video.getCuedAttributeForAccountId(account.id);
            return Video.scope({method: ['cuedAndMaxId', true, account.id]}).findAll({attributes: {include: [cued]}})
                .then(function(videos) {
                    _.forEach(videos, function(video) {
                        assert.equal(video.get('cued'), true);
                    });
                });
        });
    });
});
