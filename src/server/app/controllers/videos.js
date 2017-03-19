/**
 * videos
 * get-native.com
 *
 * Created by henryehly on 2017/01/18.
 */

const models = require('../models');
const Video = models.Video;
const Speaker = models.Speaker;
const Category = models.Category;
const Subcategory = models.Subcategory;
const ResponseWrapper = require('../helpers').ResponseWrapper;

module.exports.index = (req, res) => {
    const conditions = {language_code: 'en'};

    if (req.query.lang) {
        // validation (can do with express-validation) (whether or not IN x, y, z..)
        conditions.language_code = req.query.lang; // safe?
    }

    if (req.query.max_id) {
        conditions.id = {
            $gte: +req.query.max_id
        };
    }

    let subcategoryIdsPromise = new Promise((resolve, reject) => {
        if (req.query.subcategory_id) {
            resolve([req.query.subcategory_id]);
        } else if (req.query.category_id) {
            resolve(Subcategory.findAll({
                where: {category_id: req.query.category_id},
                attributes: ['id']
            }).then(subcategory_ids => subcategory_ids));
        } else {
            resolve([]);
        }
    });

    subcategoryIdsPromise.then(subcategory_ids => {
        if (subcategory_ids.length > 1) {
            conditions.subcategory_id = subcategory_ids[0];
        } else if (subcategory_ids.length === 1) {
            conditions.subcategory_id = {$in: subcategory_ids};
        }

        Video.findAll({
            attributes: {exclude: ['speaker_id', 'subcategory_id']},
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
            limit: 9
        }).then(videos => {
            let videosAsJson = ResponseWrapper.wrap(videos);
            res.send(videosAsJson);
        });
    });
};

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
