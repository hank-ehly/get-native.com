/**
 * param-validation
 * get-native.com
 *
 * Created by henryehly on 2017/01/22.
 */

const joi = require('joi');

module.exports = {
    account: {
        update: {
            headers: {
                authorization: joi.string().required()
            },
            body: {
                email_notifications_enabled: joi.boolean(),
                browser_notifications_enabled: joi.boolean(),
                site_language: joi.string(),
                default_study_language: joi.string()
            }
        },
        updatePassword: {
            headers: {
                authorization: joi.string().required()
            },
            body: {
                password: joi.string().required()
            }
        }
    },
    auth: {
        login: {
            body: {
                email: joi.string().email().required(),
                password: joi.string().required()
            }
        }
    },
    categories: {
        list: {
            headers: {
                authorization: joi.string().required()
            }
        }
    },
    study: {
        stats: {
            headers: {
                authorization: joi.string().required()
            }
        }
    },
    videos: {
        show: {
            headers: {
                authorization: joi.string().required()
            },
            params: {
                id: joi.number().integer().required()
            }
        },
        like: {
            headers: {
                authorization: joi.string().required()
            },
            params: {
                id: joi.number().integer().required()
            }
        },
        unlike: {
            headers: {
                authorization: joi.string().required()
            },
            params: {
                id: joi.number().integer().required()
            }
        }
    }
};
