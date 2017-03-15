/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const accounts    = require('./accounts');
const auth        = require('./auth');
const categories  = require('./categories');
const cuedVideos  = require('./cued-videos');
const speakers    = require('./speakers');
const study       = require('./study');
const videos      = require('./videos');

module.exports = {
    accounts: accounts,
    auth: auth,
    categories: categories,
    cuedVideos: cuedVideos,
    speakers: speakers,
    study: study,
    videos: videos
};
