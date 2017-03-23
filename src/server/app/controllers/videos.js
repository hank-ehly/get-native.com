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

module.exports.index = (req, res, next) => {
    const conditions = {};
    const limit      = +req.query.count || 9;

    if (req.query.max_id) {
        conditions.id = {$gte: +req.query.max_id};
    }

    return Promise.all([Language.fetchLanguageCode(req.query.lang), Subcategory.findIdsForCategoryIdOrSubcategoryId(req.query)]).then(results => {
        const languageCode   = results[0];
        const subcategoryIds = results[1];

        conditions.language_code = languageCode;

        if (subcategoryIds.length) {
            conditions.subcategory_id = {$in: subcategoryIds};
        }

        const accountId = AuthHelper.extractAccountIdFromRequest(req);
        const cued = [db.sequelize.literal('EXISTS(SELECT `video_id` FROM `cued_videos` WHERE `video_id` = `Video`.`id` AND `account_id` = ' + accountId + ')'), 'cued'];

        Video.scope('orderNewestFirst', {method: ['cued', req.query.cued_only, accountId]}, {method: ['withSubcategoryName', Subcategory]}, {method: ['withSpeakerName', Speaker]}).findAll({
            attributes: ['created_at', 'id', 'loop_count', 'picture_url', 'video_url', 'length', cued],
            where: conditions,
            limit: limit
        }).then(videos => {
            for (let i = 0; i < videos.length; i++) {
                videos[i] = videos[i].toJSON(); // todo: works, create helper
                videos[i].cued = videos[i]['cued'] === 1;
            }

            let videosAsJson = ResponseWrapper.wrap(videos);
            res.send(videosAsJson);
        });
    }).catch(err => { // todo: Pass all catches to an error helper
        next({
            message: 'Error',
            errors: [{message: `Failed to process search conditions: ${req.query}`}]
        });
    });
};

module.exports.show = (req, res, next) => {
    const accountId = AuthHelper.extractAccountIdFromRequest(req);

    const likeCountAllPromise = Like.count({where: ['video_id = ?', +req.params.id]});
    const likeCountMePromise = Like.count({where: ['video_id = ? AND account_id = ?', +req.params.id, accountId]});
    const cuedVideoCountPromise = CuedVideo.count({where: ['video_id = ? AND account_id = ?', +req.params.id, accountId]});

    const cued = [db.sequelize.literal('EXISTS(SELECT `video_id` FROM `cued_videos` WHERE `video_id` = `Video`.`id` AND `account_id` = ' + accountId + ')'), 'cued'];

    const relatedVideosPromise = Video.scope({method: ['withSubcategoryName', Subcategory]}, {method: ['withSpeakerName', Speaker]}).findAll({
        limit: 3,
        order: [['loop_count', 'DESC']],
        attributes: ['id', 'created_at', 'length', 'loop_count', cued]
    });

    const videoPromise = Video.findById(+req.params.id, {
        include: [
            {
                model: Speaker,
                attributes: ['id', 'description', 'name', 'picture_url'],
                as: 'speaker'
            }, {
                model: Subcategory,
                attributes: ['id', 'name'],
                as: 'subcategory'
            }, {
                model: Transcript,
                attributes: ['id', 'text', 'language_code'],
                as: 'transcripts',
                include: {
                    model: Collocation,
                    attributes: ['text', 'description', 'ipa_spelling'],
                    as: 'collocations',
                    include: {
                        model: UsageExample,
                        attributes: ['text'],
                        as: 'usage_examples'
                    }
                }
            }
        ],
        attributes: ['description', 'id', 'loop_count', 'picture_url', 'video_url', 'length']
    });

    return Promise.all([likeCountAllPromise, likeCountMePromise, cuedVideoCountPromise, relatedVideosPromise, videoPromise]).then(result => {
        const likeCountAll   = result[0];
        const likeCountMe    = result[1];
        const cuedVideoCount = result[2];
        const relatedVideos  = result[3];
        const video          = result[4];

        const videoAsJson = video.toJSON();

        videoAsJson.like_count = likeCountAll;
        videoAsJson.liked      = likeCountMe === 1;
        videoAsJson.cued       = cuedVideoCount === 1;

        for (let i = 0; i < relatedVideos.length; i++) {
            relatedVideos[i] = relatedVideos[i].toJSON();
            relatedVideos[i].cued = relatedVideos[i].cued === 1;
        }

        videoAsJson.related_videos = ResponseWrapper.wrap(relatedVideos);

        for (let i = 0; i < videoAsJson.transcripts.length; i++) {
            let transcript = videoAsJson.transcripts[i];
            transcript.collocations = ResponseWrapper.deepWrap(transcript.collocations, ['usage_examples']);
        }

        videoAsJson.transcripts = ResponseWrapper.wrap(videoAsJson.transcripts);
        res.send(videoAsJson);
    }).catch(err => {
        next({
            message: 'Data Error',
            errors: [{message: `Unable to find video for id ${req.params.id}`}]
        });
    });
};

module.exports.like = (req, res) => {
    res.sendStatus(204);
};

module.exports.unlike = (req, res) => {
    res.sendStatus(204);
};
