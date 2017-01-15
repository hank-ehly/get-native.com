/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/01/15.
 */

const router = require('express').Router();

const login = require('./login');
const videos_id = require('./videos_id');
const videos = require('./videos');
const categories = require('./categories');
const study_stats = require('./study-stats');
const cued_videos = require('./cued_videos');

router.use(login);
router.use(videos_id);
router.use(categories);
router.use(videos);
router.use(study_stats);
router.use(cued_videos);

module.exports = router;
