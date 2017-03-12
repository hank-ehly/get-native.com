/**
 * routes
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const express     = require('express');
const ctrl = require('../app/controllers');
const validations = require('./param-validation');
const ev          = require('express-validation');

const router = express.Router();

router.get(  '/account',               ev(validations.account.index),          ctrl.auth.authenticate, ctrl.account.index);
router.patch('/account',               ev(validations.account.update),         ctrl.auth.authenticate, ctrl.account.update);
router.post( '/account/password',      ev(validations.account.updatePassword), ctrl.auth.authenticate, ctrl.account.updatePassword);
router.post( '/account/email',         ev(validations.account.updateEmail),    ctrl.auth.authenticate, ctrl.account.updateEmail);
router.get(  '/categories',            ev(validations.categories.list),        ctrl.auth.authenticate, ctrl.categories.list);
router.get(  '/cued_videos',                                                   ctrl.auth.authenticate, ctrl.cuedVideos.list);
router.post( '/login',                 ev(validations.auth.login),                                     ctrl.auth.login);
router.get(  '/study/stats',           ev(validations.study.stats),            ctrl.auth.authenticate, ctrl.study.stats);
router.get(  '/study/writing_answers', ev(validations.study.writing_answers),  ctrl.auth.authenticate, ctrl.study.writing_answers);
router.get(  '/videos',                                                        ctrl.auth.authenticate, ctrl.videos.list);
router.get(  '/videos/:id',            ev(validations.videos.show),            ctrl.auth.authenticate, ctrl.videos.show);
router.post( '/videos/:id/like',       ev(validations.videos.like),            ctrl.auth.authenticate, ctrl.videos.like);
router.post( '/videos/:id/unlike',     ev(validations.videos.unlike),          ctrl.auth.authenticate, ctrl.videos.unlike);

module.exports = router;
