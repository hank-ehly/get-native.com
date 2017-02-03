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

router.post( '/login',             validate(validations.auth.login),                                     controllers.auth.login);
router.get(  '/categories',        validate(validations.categories.list), controllers.auth.authenticate, controllers.categories.list);
router.get(  '/cued_videos',                                              controllers.auth.authenticate, controllers.cuedVideos.list);
router.get(  '/study/stats',       validate(validations.study.stats),     controllers.auth.authenticate, controllers.study.stats);
router.get(  '/videos',                                                   controllers.auth.authenticate, controllers.videos.list);
router.get(  '/videos/:id',        validate(validations.videos.show),     controllers.auth.authenticate, controllers.videos.show);
router.post( '/videos/:id/like',   validate(validations.videos.like),     controllers.auth.authenticate, controllers.videos.like);
router.post( '/videos/:id/unlike', validate(validations.videos.unlike),   controllers.auth.authenticate, controllers.videos.unlike);
router.patch('/account',           validate(validations.account.update),  controllers.auth.authenticate, controllers.account.update);

module.exports = router;
