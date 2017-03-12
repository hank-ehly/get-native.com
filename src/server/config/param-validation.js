/**
 * param-validation
 * get-native.com
 *
 * Created by henryehly on 2017/01/22.
 */

const Joi = require('joi');

module.exports = {
    account: {
        index: {
            headers: {
                authorization: Joi.string().required()
            }
        },
        update: {
            headers: {
                authorization: Joi.string().required()
            },
            body: {
                email_notifications_enabled: Joi.boolean(),
                browser_notifications_enabled: Joi.boolean(),
                site_language: Joi.string(),
                default_study_language: Joi.string()
            }
        },
        updatePassword: {
            headers: {
                authorization: Joi.string().required()
            },
            body: {
                password: Joi.string().required()
            }
        },
        updateEmail: {
            headers: {
                authorization: Joi.string().required()
            },
            body: {
                email: Joi.string().email().required()
            }
        }
    },
    auth: {
        login: {
            body: {
                email: Joi.string().regex(/[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*/).required(),
                password: Joi.string().required().min(8)
            }
        }
    },
    categories: {
        list: {
            headers: {
                authorization: Joi.string().required()
            }
        }
    },
    study: {
        stats: {
            headers: {
                authorization: Joi.string().required()
            }
        },
        writing_answers: {
            headers: {
                authorization: Joi.string().required()
            },
            params: {
                since: Joi.number().integer()
            }
        }
    },
    videos: {
        show: {
            headers: {
                authorization: Joi.string().required()
            },
            params: {
                id: Joi.number().integer().required()
            }
        },
        like: {
            headers: {
                authorization: Joi.string().required()
            },
            params: {
                id: Joi.number().integer().required()
            }
        },
        unlike: {
            headers: {
                authorization: Joi.string().required()
            },
            params: {
                id: Joi.number().integer().required()
            }
        }
    }
};
