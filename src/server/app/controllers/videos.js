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

    return Promise.all([findLanguageCodeFromReqQuery(req.query), findAllSubcategoryIdsFromReqQuery(req.query)]).then(results => {
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
                {model: Speaker, attributes: ['name'], as: 'speaker'},
                {model: Subcategory, attributes: ['name'], as: 'subcategory'}
            ],
            limit: limit
        }).then(videos => {
            let videosAsJson = ResponseWrapper.wrap(videos);
            res.send(videosAsJson);
        });
    }).catch(e => {
        return next(e);
    });
};

function findLanguageCodeFromReqQuery(query) {
    return new Promise((resolve, reject) => {
        if (!query.lang) {
            return resolve('en');
        }

        return Language.findOne({
            where: {code: query.lang},
            attributes: ['code']
        }).then(l => {
            if (l) {
                resolve(l.code);
            } else {
                reject({
                    message: 'Validation Failed',
                    errors: [
                        {
                            message: `'${query.lang}' is not a valid language code`,
                            path: 'lang'
                        }
                    ]
                });
            }
        });
    });
}

function findAllSubcategoryIdsFromReqQuery(query) {
    return new Promise((resolve, reject) => {
        if (query.subcategory_id) {
            resolve([query.subcategory_id]);
        } else if (query.category_id) {
            resolve(findAllSubcategoryIdsForCategoryId(query.category_id));
        } else {
            resolve([]);
        }
    });
}

function findAllSubcategoryIdsForCategoryId(categoryId) {
    return Subcategory.findAll({
        where: {category_id: categoryId},
        attributes: ['id']
    }).then(subcategory_ids => subcategory_ids);
}

module.exports.show = (req, res) => {
    let mock = require('../../mock/video.json');
    res.send(mock);
};

module.exports.like = (req, res) => {
    res.sendStatus(204);
};

module.exports.unlike = (req, res) => {
    res.sendStatus(204);
};
