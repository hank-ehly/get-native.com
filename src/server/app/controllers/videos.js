/**
 * videos
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const db              = require('../models');
const Video           = db.Video;
const Speaker         = db.Speaker;
const Category        = db.Category;
const Subcategory     = db.Subcategory;
const Language        = db.Language;
const Like            = db.Like;
const Transcript      = db.Transcript;
const Collocation     = db.Collocation;
const UsageExample    = db.UsageExample;
const CuedVideo       = db.CuedVideo;
const ResponseWrapper = require('../helpers').ResponseWrapper;
const AuthHelper      = require('../helpers').Auth;
const Promise         = require('bluebird');

module.exports.index = (req, res, next) => {
    const conditions          = {};
    const langCodeQuery       = Language.fetchLanguageCode(req.query.lang);
    const subcategoryIdsQuery = Subcategory.findIdsForCategoryIdOrSubcategoryId(req.query);

    return Promise.all([langCodeQuery, subcategoryIdsQuery]).spread((languageCode, subcategoryIds) => {
        conditions.language_code = languageCode;

        if (subcategoryIds.length) {
            conditions.subcategory_id = {$in: subcategoryIds};
        }

        const accountId  = AuthHelper.extractAccountIdFromRequest(req);
        const cued       = Video.getCuedAttributeForAccountId(accountId);
        const attributes = ['created_at', 'id', 'loop_count', 'picture_url', 'video_url', 'length', cued];
        const scopes     = [
            'newestFirst',
            {method: ['cued', req.query.cued_only, accountId]},
            {method: ['count', req.query.count]},
            {method: ['maxId', req.query.max_id]},
            {method: ['includeSubcategoryName', Subcategory]},
            {method: ['includeSpeakerName', Speaker]}
        ];

        Video.scope(scopes).findAll({
            attributes: attributes,
            where: conditions
        }).then(videos => {
            const videosAsJson = ResponseWrapper.wrap(videos.map(v => {
                v = v.get({plain: true});
                v.cued = v.cued === 1;
                return v;
            }));

            res.send(videosAsJson);
        });
    }).catch(() => { // todo: Pass all catches to an error helper
        next({
            message: 'Error',
            errors: [{message: `Failed to process search conditions: ${req.query}`}]
        });
    });
};

module.exports.show = (req, res, next) => {
    const accountId = AuthHelper.extractAccountIdFromRequest(req);
    const likeCount = Video.getLikeCount(db, req.params.id);
    const liked     = Video.isLikedByAccount(db, req.params.id, accountId);
    const cued      = Video.isCuedByAccount(db, req.params.id, accountId);

    const relatedVideos = Video.scope([
        'orderMostViewed', {method: ['includeSubcategoryName', Subcategory]}, {method: ['includeSpeakerName', Speaker]}
    ]).findAll({
        attributes: ['id', 'created_at', 'length', 'loop_count', Video.getCuedAttributeForAccountId(accountId)],
        limit: 3
    }).catch(() => {
        next({
            message: 'Data Error',
            errors: [{message: `Unable to find related videos`}]
        });
    });

    const video = Video.scope({method: ['includeTranscripts', db]}).findById(+req.params.id, {
        include: [
            {model: Speaker, attributes: ['id', 'description', 'name', 'picture_url'], as: 'speaker'},
            {model: Subcategory, attributes: ['id', 'name'], as: 'subcategory'}
        ],
        attributes: ['description', 'id', 'loop_count', 'picture_url', 'video_url', 'length']
    }).catch(() => {
        next({
            message: 'Data Error',
            errors: [{message: `Unable to find video with id ${req.params.id}`}]
        });
    });

    return Promise.all([likeCount, liked, cued, relatedVideos, video]).spread((likeCount, liked, cued, relatedVideos, video) => {
        video = video.get({plain: true});

        video.like_count = likeCount;
        video.liked      = liked;
        video.cued       = cued;

        video.related_videos = ResponseWrapper.wrap(relatedVideos.map(r => {
            r = r.get({plain: true});
            r.cued = r.cued === 1;
            return r;
        }));

        video.transcripts = ResponseWrapper.wrap(video.transcripts.map(t => {
            t.collocations = ResponseWrapper.deepWrap(t.collocations, ['usage_examples']);
            return t;
        }));

        res.send(video);
    }).catch(err => {
        next({
            message: 'Error',
            errors: [{message: `Unknown error`}]
        });
    });
};

module.exports.like = (req, res, next) => {
    Video.findById(+req.params.id).then(video => {
        const accountId = AuthHelper.extractAccountIdFromRequest(req);
        Like.create({video_id: video.id, account_id: accountId}).then(() => {
            res.sendStatus(204);
        }).catch(() => {
            res.status(500);
            next();
        });
    }).catch(() => {
        res.status(404);
        next();
    });
};

module.exports.unlike = (req, res, next) => {
    Video.findById(+req.params.id).then(video => {
        const accountId = AuthHelper.extractAccountIdFromRequest(req);
        Like.destroy({where: {video_id: video.id, account_id: accountId}, limit: 1}).then(() => {
            res.sendStatus(204);
        }).catch(() => {
            res.status(500);
            next();
        });
    }).catch(() => {
        res.status(404);
        next();
    });
};
