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
const ResponseWrapper = require('../helpers').ResponseWrapper;

module.exports.index = (req, res) => {
    const conditions = {};
    const limit      = req.query.count || 9;

    conditions.language_code = req.query.lang || 'en';

    if (req.query.max_id) {
        conditions.id = {$gte: +req.query.max_id};
    }

    // todo: Query can be improved
    findAllSubcategoryIdsFromReqQuery(req).then(subcategoryIds => {
        if (subcategoryIds.length) {
            conditions.subcategory_id = {$in: subcategoryIds};
        }

        Video.findAll({
            attributes: {exclude: ['speaker_id', 'subcategory_id', 'language_code', 'updated_at']},
            where: conditions,
            include: [
                {
                    model: Speaker,
                    attributes: ['name'],
                    as: 'speaker'
                }, {
                    model: Subcategory,
                    attributes: ['name'],
                    as: 'subcategory'
                }
            ],
            limit: limit
        }).then(videos => {
            let videosAsJson = ResponseWrapper.wrap(videos);
            res.send(videosAsJson);
        });
    });
};

function findAllSubcategoryIdsFromReqQuery(req) {
    return new Promise((resolve, reject) => {
        if (req.query.subcategory_id) {
            resolve([req.query.subcategory_id]);
        } else if (req.query.category_id) {
            resolve(findAllSubcategoryIdsForCategoryId(req.query.category_id));
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
