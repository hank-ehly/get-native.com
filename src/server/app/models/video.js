/**
 * video
 * get-native.com
 *
 * Created by henryehly on 2017/02/24.
 */

module.exports = function(sequelize, DataTypes) {
    const Video = sequelize.define('Video', {
        length: DataTypes.INTEGER,
        picture_url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        loop_count: DataTypes.INTEGER,
        video_url: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        language_code: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    }, {
        tableName: 'videos',
        underscored: true,
        associations: function(models) {
            models.Video.belongsTo(models.Speaker, {as: 'speaker'});
            models.Video.belongsTo(models.Subcategory, {as: 'subcategory'});
            models.Video.hasMany(models.CuedVideo, {as: 'cued_videos'});
            models.Video.hasMany(models.Like, {as: 'likes'});
            models.Video.hasMany(models.StudySession, {as: 'study_sessions'});
            models.Video.hasMany(models.Transcript, {as: 'transcripts'});
        },
        scopes: {
            count: function(count) {
                return {limit: count ? +count : 9};
            },
            cuedAndMaxId: function(cuedOnly, accountId, maxId) {
                const conditions = {};

                if (cuedOnly && accountId) {
                    conditions.where = {
                        id: {
                            $in: [sequelize.literal('SELECT `video_id` FROM `cued_videos` WHERE `account_id` = ' + accountId)]
                        }
                    };
                }

                if (maxId) {
                    if (conditions.where && conditions.where.id) {
                        conditions.where.id.$gte = +maxId;
                    } else {
                        conditions.where = {
                            id: {
                                $gte: +maxId
                            }
                        }
                    }
                }

                return conditions;
            },
            newestFirst: {
                order: [['created_at', 'DESC']]
            },
            includeSpeakerName: function(Speaker) {
                return {include: [{model: Speaker, attributes: ['name'], as: 'speaker'}]}
            },
            includeSubcategoryNameAndId: function(Subcategory) {
                return {include: [{model: Subcategory, attributes: ['id', 'name'], as: 'subcategory'}]}
            },
            orderMostViewed: {
                order: [['loop_count', 'DESC']]
            },
            includeTranscripts: function(db) {
                return {
                    include: [
                        {
                            model: db.Transcript,
                            attributes: ['id', 'text', 'language_code'],
                            as: 'transcripts',
                            include: {
                                model: db.Collocation,
                                attributes: ['text', 'description', 'ipa_spelling'],
                                as: 'collocations',
                                include: {
                                    model: db.UsageExample,
                                    attributes: ['text'],
                                    as: 'usage_examples'
                                }
                            }
                        }
                    ]
                }
            }
        }
    });

    Video.getCuedAttributeForAccountId = function(accountId) {
        const queryString = 'EXISTS(SELECT `video_id` FROM `cued_videos` WHERE `video_id` = `Video`.`id` AND `account_id` = ' + accountId + ')';
        return [sequelize.literal(queryString), 'cued'];
    };

    Video.isLikedByAccount = function(db, videoId, accountId) {
        // todo: use EXISTS
        return db.Like.count({where: ['video_id = ? AND account_id = ?', videoId, accountId]}).then(c => c === 1);
    };

    Video.isCuedByAccount = function(db, videoId, accountId) {
        // todo: use EXISTS
        return db.CuedVideo.count({where: ['video_id = ? AND account_id = ?', videoId, accountId]}).then(c => c === 1);
    };

    Video.getLikeCount = function(db, videoId) {
        return db.Like.count({where: ['video_id = ?', videoId]});
    };

    return Video;
};
