/**
 * routes
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const ctrl   = require('../app/controllers');
const router = require('express').Router();

router.get(  '/account',               ctrl.auth.authenticate, ctrl.account.index);
router.patch('/account',               ctrl.auth.authenticate, ctrl.account.update);
router.post( '/account/password',      ctrl.auth.authenticate, ctrl.account.updatePassword);
router.post( '/account/email',         ctrl.auth.authenticate, ctrl.account.updateEmail);
router.get(  '/categories',            ctrl.auth.authenticate, ctrl.categories.list);
router.get(  '/cued_videos',           ctrl.auth.authenticate, ctrl.cuedVideos.list);
router.post( '/login',                                         ctrl.auth.login);
router.get(  '/study/stats',           ctrl.auth.authenticate, ctrl.study.stats);
router.get(  '/study/writing_answers', ctrl.auth.authenticate, ctrl.study.writing_answers);
router.get(  '/videos',                ctrl.auth.authenticate, ctrl.videos.list);
router.get(  '/videos/:id',            ctrl.auth.authenticate, ctrl.videos.show);
router.post( '/videos/:id/like',       ctrl.auth.authenticate, ctrl.videos.like);
router.post( '/videos/:id/unlike',     ctrl.auth.authenticate, ctrl.videos.unlike);

module.exports = router;
