/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const account    = require('./account');
const auth       = require('./auth');
const categories = require('./categories');
const cuedVideos = require('./cued-videos');
const study      = require('./study');
const videos     = require('./videos');

module.exports = {
    account: account,
    auth: auth,
    categories: categories,
    cuedVideos: cuedVideos,
    study: study,
    videos: videos
};
