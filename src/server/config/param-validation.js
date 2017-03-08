/**
 * param-validation
 * get-native.com
 *
 * Created by henryehly on 2017/01/22.
 */

const joi = require('joi');

module.exports = {
    account: {
        index: {
            headers: {
                authorization: joi.string().required()
            }
        },
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
        },
        updateEmail: {
            headers: {
                authorization: joi.string().required()
            },
            body: {
                email: joi.string().email().required()
            }
        }
    },
    auth: {
        login: {
            body: {
                email: joi.string().regex(/[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*/).required(),
                password: joi.string().required().min(8)
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
        },
        writing_answers: {
            headers: {
                authorization: joi.string().required()
            },
            params: {
                since: joi.number().integer()
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
