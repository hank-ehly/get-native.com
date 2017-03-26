/**
 * speakers
 * get-native.com
 *
 * Created by henryehly on 2017/03/16.
 */

const Speaker = require('../models').Speaker;

module.exports.show = (req, res, next) => {
    Speaker.findById(req.params.id, {attributes: {exclude: ['created_at', 'updated_at']}}).then(speaker => {
        let speakerAsJson = speaker.toJSON();
        res.send(speakerAsJson);
    }).catch(() => {
        next({
            message: 'Error',
            errors: [{message: 'Unable to fetch speaker'}]
        })
    });
};
