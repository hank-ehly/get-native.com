/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const accounts    = require('./accounts');
const auth        = require('./auth');
const categories  = require('./categories');
const speakers    = require('./speakers');
const study       = require('./study');
const videos      = require('./videos');

module.exports = {
    accounts: accounts,
    auth: auth,
    categories: categories,
    speakers: speakers,
    study: study,
    videos: videos
};
