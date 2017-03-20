/**
 * videos
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const models          = require('../models');
const Video           = models.Video;
const Speaker         = models.Speaker;
const Category        = models.Category;
const Subcategory     = models.Subcategory;
const Language        = models.Language;
const ResponseWrapper = require('../helpers').ResponseWrapper;

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
            limit: limit
        }).then(videos => {
            let videosAsJson = ResponseWrapper.wrap(videos);
            res.send(videosAsJson);
        });
    }).catch(err => { // todo: Pass all catches to an error helper
        const errObj = {
            message: 'Error',
            errors: [{message: `Failed to process search conditions: ${req.query}`}]
        };
        next(errObj)
    });
};

module.exports.show = (req, res) => {
    Video.findById(+req.params.id, {
        include: [
            {model: Speaker, attributes: ['id', 'description', 'name', 'picture_url'], as: 'speaker'},
            {model: Subcategory, attributes: ['id', 'name'], as: 'subcategory'}
        ]
    }).then(video => {
        let videoAsJson = video.toJSON();
        res.send(videoAsJson);
    }).catch(err => {
        const errObj = {
            message: 'Data Error',
            errors: [{message: `Unable to find video for id ${req.params.id}`}]
        };
        next(errObj)
    });
};

module.exports.like = (req, res) => {
    res.sendStatus(204);
};

module.exports.unlike = (req, res) => {
    res.sendStatus(204);
};
