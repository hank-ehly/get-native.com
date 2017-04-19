/**
 * routes
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const ctrl     = require('../app/controllers');
const router   = require('express').Router();
const pv       = require('./param-validation');
const v = require('../app/middleware').ValidateRequestParameters;

router.get(  '/account',                     v(pv.accounts.index),          ctrl.auth.authenticate, ctrl.accounts.index);
router.patch('/account',                     v(pv.accounts.update),         ctrl.auth.authenticate, ctrl.accounts.update);
router.post( '/account/password',            v(pv.accounts.updatePassword), ctrl.auth.authenticate, ctrl.accounts.updatePassword);
router.post( '/account/email',               v(pv.accounts.updateEmail),    ctrl.auth.authenticate, ctrl.accounts.updateEmail);
router.get(  '/categories',                  v(pv.categories.index),        ctrl.auth.authenticate, ctrl.categories.index);
router.post( '/confirm_email',               v(pv.auth.confirmEmail),                               ctrl.auth.confirmEmail);
router.post( '/login',                       v(pv.auth.login),                                      ctrl.auth.login);
router.post( '/register',                    v(pv.auth.register),                                   ctrl.auth.register);
router.post( '/resend_confirmation_email',   v(pv.auth.resendConfirmationEmail),                    ctrl.auth.resendConfirmationEmail);
router.get(  '/study/stats/:lang',           v(pv.study.stats),             ctrl.auth.authenticate, ctrl.study.stats);
router.get(  '/study/writing_answers/:lang', v(pv.study.writing_answers),   ctrl.auth.authenticate, ctrl.study.writing_answers);
router.get(  '/speakers/:id',                v(pv.speakers.show),           ctrl.auth.authenticate, ctrl.speakers.show);
router.get(  '/videos',                      v(pv.videos.index),            ctrl.auth.authenticate, ctrl.videos.index);
router.get(  '/videos/:id',                  v(pv.videos.show),             ctrl.auth.authenticate, ctrl.videos.show);
router.post( '/videos/:id/like',             v(pv.videos.like),             ctrl.auth.authenticate, ctrl.videos.like);
router.post( '/videos/:id/unlike',           v(pv.videos.unlike),           ctrl.auth.authenticate, ctrl.videos.unlike);

module.exports = router;
