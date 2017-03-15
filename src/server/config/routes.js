/**
 * routes
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const ctrl   = require('../app/controllers');
const pv     = require('./param-validation');
const ev     = require('express-validation');
const router = require('express').Router();

router.get(  '/account',               ev(pv.accounts.index),          ctrl.auth.authenticate, ctrl.accounts.index);
router.patch('/account',               ev(pv.accounts.update),         ctrl.auth.authenticate, ctrl.accounts.update);
router.post( '/account/password',      ev(pv.accounts.updatePassword), ctrl.auth.authenticate, ctrl.accounts.updatePassword);
router.post( '/account/email',         ev(pv.accounts.updateEmail),    ctrl.auth.authenticate, ctrl.accounts.updateEmail);
router.get(  '/categories',            ev(pv.categories.index),        ctrl.auth.authenticate, ctrl.categories.index);
router.get(  '/cued_videos',                                           ctrl.auth.authenticate, ctrl.cuedVideos.list);
router.post( '/login',                 ev(pv.auth.login),                                      ctrl.auth.login);
router.get(  '/study/stats',           ev(pv.study.stats),             ctrl.auth.authenticate, ctrl.study.stats);
router.get(  '/study/writing_answers', ev(pv.study.writing_answers),   ctrl.auth.authenticate, ctrl.study.writing_answers);
router.get(  '/speakers/:id',          ev(pv.speakers.show),           ctrl.auth.authenticate, ctrl.speakers.show);
router.get(  '/videos',                                                ctrl.auth.authenticate, ctrl.videos.index);
router.get(  '/videos/:id',            ev(pv.videos.show),             ctrl.auth.authenticate, ctrl.videos.show);
router.post( '/videos/:id/like',       ev(pv.videos.like),             ctrl.auth.authenticate, ctrl.videos.like);
router.post( '/videos/:id/unlike',     ev(pv.videos.unlike),           ctrl.auth.authenticate, ctrl.videos.unlike);

module.exports = router;
