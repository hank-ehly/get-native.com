/**
 * routes
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const ctrl     = require('../app/controllers');
const router   = require('express').Router();
const pv       = require('./param-validation');

const middleware     = require('../app/middleware');
const ValidateParams = middleware.ValidateRequestParameters;
const SetAccountId   = middleware.SetAccountId;
const Authenticate   = ctrl.auth.authenticate;

router.get(  '/account',                     ValidateParams(pv.accounts.index),               SetAccountId, Authenticate, ctrl.accounts.index);
router.patch('/account',                     ValidateParams(pv.accounts.update),              SetAccountId, Authenticate, ctrl.accounts.update);
router.post( '/account/password',            ValidateParams(pv.accounts.updatePassword),      SetAccountId, Authenticate, ctrl.accounts.updatePassword);
router.post( '/account/email',               ValidateParams(pv.accounts.updateEmail),         SetAccountId, Authenticate, ctrl.accounts.updateEmail);
router.get(  '/categories',                  ValidateParams(pv.categories.index),             SetAccountId, Authenticate, ctrl.categories.index);
router.post( '/confirm_email',               ValidateParams(pv.auth.confirmEmail),                                        ctrl.auth.confirmEmail);
router.post( '/login',                       ValidateParams(pv.auth.login),                                               ctrl.auth.login);
router.post( '/register',                    ValidateParams(pv.auth.register),                                            ctrl.auth.register);
router.post( '/resend_confirmation_email',   ValidateParams(pv.auth.resendConfirmationEmail),                             ctrl.auth.resendConfirmationEmail);
router.get(  '/study/:lang/stats',           ValidateParams(pv.study.stats),                  SetAccountId, Authenticate, ctrl.study.stats);
router.get(  '/study/:lang/writing_answers', ValidateParams(pv.study.writing_answers),        SetAccountId, Authenticate, ctrl.study.writing_answers);
router.get(  '/speakers/:id',                ValidateParams(pv.speakers.show),                SetAccountId, Authenticate, ctrl.speakers.show);
router.get(  '/videos',                      ValidateParams(pv.videos.index),                 SetAccountId, Authenticate, ctrl.videos.index);
router.get(  '/videos/:id',                  ValidateParams(pv.videos.show),                  SetAccountId, Authenticate, ctrl.videos.show);
router.post( '/videos/:id/dequeue',          ValidateParams(pv.videos.dequeue),               SetAccountId, Authenticate, ctrl.videos.dequeue);
router.post( '/videos/:id/like',             ValidateParams(pv.videos.like),                  SetAccountId, Authenticate, ctrl.videos.like);
router.post( '/videos/:id/queue',            ValidateParams(pv.videos.queue),                 SetAccountId, Authenticate, ctrl.videos.queue);
router.post( '/videos/:id/unlike',           ValidateParams(pv.videos.unlike),                SetAccountId, Authenticate, ctrl.videos.unlike);

module.exports = router;
