/**
 * param-validation
 * get-native.com
 *
 * Created by henryehly on 2017/01/22.
 */

const Joi = require('joi');

module.exports = {
    accounts: {
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
        index: {
            headers: {
                authorization: Joi.string().required()
            }
        }
    },
    speakers: {
        show: {
            headers: {
                authorization: Joi.string().required()
            },
            params: {
                id: Joi.number().integer().min(1).required()
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
            query: {
                since: Joi.date().max('now').timestamp('javascript'),
                max_id: Joi.number().integer().min(1)
            }
        }
    },
    videos: {
        index: {
            headers: {
                authorization: Joi.string().required()
            },
            query: {
                max_id: Joi.number().integer().min(1),
                category_id: Joi.number().integer().min(1),
                subcategory_id: Joi.number().integer().min(1),
                lang: Joi.string().lowercase(),
                count: Joi.number().integer().min(1).max(9),
                q: Joi.string().lowercase().max(100),
                cued_only: Joi.boolean()
            }
        },
        show: {
            headers: {
                authorization: Joi.string().required()
            },
            params: {
                id: Joi.number().integer().min(1).required()
            }
        },
        like: {
            headers: {
                authorization: Joi.string().required()
            },
            params: {
                id: Joi.number().integer().min(1).required()
            }
        },
        unlike: {
            headers: {
                authorization: Joi.string().required()
            },
            params: {
                id: Joi.number().integer().min(1).required()
            }
        }
    }
};
