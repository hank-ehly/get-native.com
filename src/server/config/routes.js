/**
 * routes
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const express = require('express');

// Todo: Consolidate
const auth = require('../app/controllers/auth');
const categories = require('../app/controllers/categories');
const cuedVideos = require('../app/controllers/cued-videos');
const study = require('../app/controllers/study');
const videos = require('../app/controllers/videos');

const router = express.Router();

// Todo: express-validations
router.post('/login', auth.login);
router.get('/categories', categories.list);
router.get('/cued_videos', cuedVideos.list);
router.get('/study/stats', study.stats);
router.get('/videos', videos.list);
router.get('/videos/:id', videos.show);
router.post('/videos/:id/like', videos.like);

module.exports = router;
