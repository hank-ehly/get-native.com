/**
 * routes
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const ctrl     = require('../app/controllers');
const router   = require('express').Router();
const pv       = require('./param-validation');
const validate = require('../app/middleware').ValidateRequestParameters;

router.get(  '/account',                     validate(pv.accounts.index),          ctrl.auth.authenticate, ctrl.accounts.index);
router.patch('/account',                     validate(pv.accounts.update),         ctrl.auth.authenticate, ctrl.accounts.update);
router.post( '/account/password',            validate(pv.accounts.updatePassword), ctrl.auth.authenticate, ctrl.accounts.updatePassword);
router.post( '/account/email',               validate(pv.accounts.updateEmail),    ctrl.auth.authenticate, ctrl.accounts.updateEmail);
router.get(  '/categories',                  validate(pv.categories.index),        ctrl.auth.authenticate, ctrl.categories.index);
router.post( '/login',                       validate(pv.auth.login),                                      ctrl.auth.login);
router.post( '/register',                    validate(pv.auth.register),                                   ctrl.auth.register);
router.get(  '/study/stats/:lang',           validate(pv.study.stats),             ctrl.auth.authenticate, ctrl.study.stats);
router.get(  '/study/writing_answers/:lang', validate(pv.study.writing_answers),   ctrl.auth.authenticate, ctrl.study.writing_answers);
router.get(  '/speakers/:id',                validate(pv.speakers.show),           ctrl.auth.authenticate, ctrl.speakers.show);
router.get(  '/videos',                      validate(pv.videos.index),            ctrl.auth.authenticate, ctrl.videos.index);
router.get(  '/videos/:id',                  validate(pv.videos.show),             ctrl.auth.authenticate, ctrl.videos.show);
router.post( '/videos/:id/like',             validate(pv.videos.like),             ctrl.auth.authenticate, ctrl.videos.like);
router.post( '/videos/:id/unlike',           validate(pv.videos.unlike),           ctrl.auth.authenticate, ctrl.videos.unlike);

module.exports = router;
