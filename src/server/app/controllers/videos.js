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

        Video.findAll({
            attributes: {exclude: ['speaker_id', 'subcategory_id', 'language_code', 'updated_at']},
            where: conditions,
            include: [
                {model: Speaker,     attributes: ['name'], as: 'speaker'},
                {model: Subcategory, attributes: ['name'], as: 'subcategory'}
            ],
            order: [['created_at', 'DESC']],
            limit: limit
        }).then(videos => {
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
    // query(sql, [options={}]) -> Promise
    // [options.nest=false]
    // If true, transforms objects with . separated property names into nested objects using dottie.js.
    // For example { 'user.username': 'john' } becomes { user: { username: 'john' }}.
    // When nest is true, the query type is assumed to be 'SELECT', unless otherwise specified

    // SELECT v.id, v.description, v.loop_count, v.picture_url, v.video_url, v.length, l.like_count
    // FROM videos AS v
    // LEFT JOIN (
    //     SELECT video_id, COUNT(video_id) AS like_count
    // FROM likes WHERE video_id = ${req.params.id}
    // ) AS l ON v.id = l.video_id

    const accountId = AuthHelper.extractAccountIdFromRequest(req);

    let q = `
        SELECT
            \`Video\`.\`description\`,
            \`Video\`.\`id\`,
            \`Video\`.\`loop_count\`,
            \`Video\`.\`picture_url\`,
            \`Video\`.\`video_url\`,
            \`Video\`.\`length\`,
            \`speaker\`.\`id\`                                   AS \`speaker.id\`,
            \`speaker\`.\`description\`                          AS \`speaker.description\`,
            \`speaker\`.\`name\`                                 AS \`speaker.name\`,
            \`speaker\`.\`picture_url\`                          AS \`speaker.picture_url\`,
            \`subcategory\`.\`id\`                               AS \`subcategory.id\`,
            \`subcategory\`.\`name\`                             AS \`subcategory.name\`,
            \`transcripts\`.\`id\`                               AS \`transcripts.id\`,
            \`transcripts\`.\`text\`                             AS \`transcripts.text\`,
            \`transcripts\`.\`language_code\`                    AS \`transcripts.language_code\`,
            \`transcripts.collocations\`.\`id\`                  AS \`transcripts.collocations.id\`,
            \`transcripts.collocations\`.\`text\`                AS \`transcripts.collocations.text\`,
            \`transcripts.collocations\`.\`description\`         AS \`transcripts.collocations.description\`,
            \`transcripts.collocations\`.\`ipa_spelling\`        AS \`transcripts.collocations.ipa_spelling\`,
            \`transcripts.collocations.usage_examples\`.\`id\`   AS \`transcripts.collocations.usage_examples.id\`,
            \`transcripts.collocations.usage_examples\`.\`text\` AS \`transcripts.collocations.usage_examples.text\`,
            \`like_all\`.\`like_count\`                          AS \`like_count\`,
            \`like_me\`.\`liked\`                                AS \`liked\`,
            \`cued_videos\`.\`cued\`                             AS \`cued\`
        FROM videos AS Video
            LEFT OUTER JOIN \`speakers\`       AS \`speaker\`                                 ON \`Video\`.\`speaker_id\` = \`speaker\`.\`id\`
            LEFT OUTER JOIN \`subcategories\`  AS \`subcategory\`                             ON \`Video\`.\`subcategory_id\` = \`subcategory\`.\`id\`
            LEFT OUTER JOIN \`transcripts\`    AS \`transcripts\`                             ON \`Video\`.\`id\` = \`transcripts\`.\`video_id\`
            LEFT OUTER JOIN \`collocations\`   AS \`transcripts.collocations\`                ON \`transcripts\`.\`id\` = \`transcripts.collocations\`.\`transcript_id\`
            LEFT OUTER JOIN \`usage_examples\` AS \`transcripts.collocations.usage_examples\` ON \`transcripts.collocations\`.\`id\` = \`transcripts.collocations.usage_examples\`.\`collocation_id\`
            LEFT OUTER JOIN (
                SELECT 
                    video_id, 
                    COUNT(video_id) AS like_count
                FROM likes
                WHERE video_id = ${+req.params.id}
            )                              AS \`like_all\`                                ON \`Video\`.\`id\` = \`like_all\`.\`video_id\`
            LEFT OUTER JOIN (
                SELECT
                    video_id,
                    account_id,
                    (COUNT(video_id) = 1) AS liked
                FROM likes
                WHERE video_id = ${+req.params.id} AND account_id = ${accountId}
            )                              AS \`like_me\`                                 ON \`Video\`.\`id\` = \`like_me\`.\`video_id\`
            LEFT OUTER JOIN (
                SELECT
                    video_id,
                    account_id,
                    (COUNT(video_id) = 1) AS cued
                FROM cued_videos
                WHERE video_id = ${+req.params.id} AND account_id = ${accountId}
            )                              AS \`cued_videos\`                             ON \`Video\`.\`id\` = \`cued_videos\`.\`video_id\`
        WHERE Video.id = ${+req.params.id};
    `;

    // let q = `
    //     SELECT
    //         `Video`.`description`,
    //         `Video`.`id`,
    //         `Video`.`loop_count`,
    //         `Video`.`picture_url`,
    //         `Video`.`video_url`,
    //         `Video`.`length`,
    //         `speaker`.`id`          AS `speaker.id`,
    //         `speaker`.`description` AS `speaker.description`,
    //         `speaker`.`name` AS `speaker.name`,
    //         `speaker`.`picture_url`                          AS `speaker.picture_url`,
    //         `subcategory`.`id`                               AS `subcategory.id`,
    //         `subcategory`.`name`                             AS `subcategory.name`,
    //         `transcripts`.`id`                               AS `transcripts.id`,
    //         `transcripts`.`text`                             AS `transcripts.text`,
    //         `transcripts`.`language_code`                    AS `transcripts.language_code`,
    //         `transcripts.collocations`.`id`                  AS `transcripts.collocations.id`,
    //         `transcripts.collocations`.`text`                AS `transcripts.collocations.text`,
    //         `transcripts.collocations`.`description`         AS `transcripts.collocations.description`,
    //         `transcripts.collocations`.`ipa_spelling`        AS `transcripts.collocations.ipa_spelling`,
    //         `transcripts.collocations.usage_examples`.`id`   AS `transcripts.collocations.usage_examples.id`,
    //         `transcripts.collocations.usage_examples`.`text` AS `transcripts.collocations.usage_examples.text`
    //     FROM `videos` AS `Video`
    //          LEFT OUTER JOIN `speakers`       AS `speaker`                                 ON `Video`.`speaker_id` = `speaker`.`id`
    //          LEFT OUTER JOIN `subcategories`  AS `subcategory`                             ON `Video`.`subcategory_id` = `subcategory`.`id`
    //          LEFT OUTER JOIN `transcripts`    AS `transcripts`                             ON `Video`.`id` = `transcripts`.`video_id`
    //          LEFT OUTER JOIN `collocations`   AS `transcripts.collocations`                ON `transcripts`.`id` = `transcripts.collocations`.`transcript_id`
    //          LEFT OUTER JOIN `usage_examples` AS `transcripts.collocations.usage_examples` ON `transcripts.collocations`.`id` = `transcripts.collocations.usage_examples`.`collocation_id`
    //      WHERE `Video`.`id` = 636;
    // `;

    return db.sequelize.query(q, {
        nest: true,
        // logging: console.log,
        type: db.sequelize.QueryTypes.SELECT,
        plain: true
    }).then(results => {
        console.log(results);
        let videoAsJson = results;

        // const videoAsJson = result.toJSON();

        // videoAsJson.like_count     = likeCountAll;
        // videoAsJson.liked          = likeCountMe === 1;
        // videoAsJson.cued           = cuedVideoCount === 1;
        // videoAsJson.related_videos = ResponseWrapper.wrap(relatedVideos);

        for (let i = 0; i < videoAsJson.transcripts.length; i++) {
            let transcript = videoAsJson.transcripts[i];
            transcript.collocations = ResponseWrapper.deepWrap(transcript.collocations, ['usage_examples']);
        }

        videoAsJson.transcripts = ResponseWrapper.wrap(videoAsJson.transcripts);
        res.send(videoAsJson);
    }).catch(e => console.log(e));

    // const likeCountAllPromise = Like.count({where: ['video_id = ?', +req.params.id]});
    // const likeCountMePromise = Like.count({where: ['video_id = ? AND account_id = ?', +req.params.id, accountId]});
    // const cuedVideoCountPromise = CuedVideo.count({where: ['video_id = ? AND account_id = ?', +req.params.id, accountId]});
    //
    // const relatedVideosPromise = Video.findAll({
    //     limit: 3,
    //     order: [['loop_count', 'DESC']],
    //     attributes: ['id', 'created_at', 'length', 'loop_count'],
    //     include: [
    //         {
    //             model: Speaker,
    //             attributes: ['name'],
    //             as: 'speaker'
    //         }, {
    //             model: Subcategory,
    //             attributes: ['name'],
    //             as: 'subcategory'
    //         }
    //     ]
    // });
    //
    // const videoPromise = Video.findById(+req.params.id, {
    //     include: [
    //         {
    //             model: Speaker,
    //             attributes: ['id', 'description', 'name', 'picture_url'],
    //             as: 'speaker'
    //         }, {
    //             model: Subcategory,
    //             attributes: ['id', 'name'],
    //             as: 'subcategory'
    //         }, {
    //             model: Transcript,
    //             attributes: ['id', 'text', 'language_code'],
    //             as: 'transcripts',
    //             include: {
    //                 model: Collocation,
    //                 attributes: ['text', 'description', 'ipa_spelling'],
    //                 as: 'collocations',
    //                 include: {
    //                     model: UsageExample,
    //                     attributes: ['text'],
    //                     as: 'usage_examples'
    //                 }
    //             }
    //         }
    //     ],
    //     attributes: ['description', 'id', 'loop_count', 'picture_url', 'video_url', 'length']
    // });
    //
    // return Promise.all([likeCountAllPromise, likeCountMePromise, cuedVideoCountPromise, relatedVideosPromise, videoPromise]).then(result => {
    //     const likeCountAll   = result[0];
    //     const likeCountMe    = result[1];
    //     const cuedVideoCount = result[2];
    //     const relatedVideos  = result[3];
    //     const video          = result[4];
    //
    //     const videoAsJson = video.toJSON();
    //
    //     videoAsJson.like_count     = likeCountAll;
    //     videoAsJson.liked          = likeCountMe === 1;
    //     videoAsJson.cued           = cuedVideoCount === 1;
    //     videoAsJson.related_videos = ResponseWrapper.wrap(relatedVideos);
    //
    //     for (let i = 0; i < videoAsJson.transcripts.length; i++) {
    //         let transcript = videoAsJson.transcripts[i];
    //         transcript.collocations = ResponseWrapper.deepWrap(transcript.collocations, ['usage_examples']);
    //     }
    //
    //     videoAsJson.transcripts = ResponseWrapper.wrap(videoAsJson.transcripts);
    //     res.send(videoAsJson);
    // }).catch(err => {
    //     next({
    //         message: 'Data Error',
    //         errors: [{message: `Unable to find video for id ${req.params.id}`}]
    //     });
    // });
};

module.exports.like = (req, res) => {
    res.sendStatus(204);
};

module.exports.unlike = (req, res) => {
    res.sendStatus(204);
};
