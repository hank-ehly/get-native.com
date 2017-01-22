/**
 * routes
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const express     = require('express');
const controllers = require('../app/controllers');
const validations = require('./param-validation');
const validate    = require('express-validation');

const router = express.Router();

// Todo: express-validations

router.post('/login', validate(validations.auth.login), controllers.auth.login);
router.get('/categories', controllers.categories.list);
router.get('/cued_videos', controllers.cuedVideos.list);
router.get('/study/stats', controllers.study.stats);
router.get('/videos', controllers.videos.list);
router.get('/videos/:id', controllers.videos.show);
router.post('/videos/:id/like', controllers.videos.like);

module.exports = router;
