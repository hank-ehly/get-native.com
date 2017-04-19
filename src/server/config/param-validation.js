/**
 * param-validation
 * get-native.com
 *
 * Created by henryehly on 2017/01/22.
 */

const Joi = require('joi');

const regex = {
    email: /[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*/,
    timeZoneOffset: /^-*[0-9]+$/
};

const validLangCodes = ['en', 'ja'];

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
                default_study_language_code: Joi.string().lowercase().valid(validLangCodes)
            }
        },
        updatePassword: {
            headers: {
                authorization: Joi.string().required()
            },
            body: {
                current_password: Joi.string().required(),
                new_password: Joi.string().required().min(8)
            }
        },
        updateEmail: {
            headers: {
                authorization: Joi.string().required()
            },
            body: {
                email: Joi.string().regex(regex.email).required(),
            }
        }
    },
    auth: {
        login: {
            body: {
                email: Joi.string().regex(regex.email).required(),
                password: Joi.string().required().min(8)
            }
        },
        register: {
            body: {
                email: Joi.string().regex(regex.email).required(),
                password: Joi.string().required().min(8)
            }
        },
        confirmEmail: {
            body: {
                token: Joi.string().length(32).required()
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
            },
            params: {
                lang: Joi.string().lowercase().valid(validLangCodes).required()
            }
        },
        writing_answers: {
            headers: {
                authorization: Joi.string().required()
            },
            params: {
                lang: Joi.string().lowercase().valid(validLangCodes).required()
            },
            query: {
                since: Joi.date().max('now').timestamp('javascript'),
                max_id: Joi.number().integer().min(1),
                time_zone_offset: Joi.string().regex(regex.timeZoneOffset)
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
                lang: Joi.string().lowercase().valid(validLangCodes),
                count: Joi.number().integer().min(1).max(9),
                q: Joi.string().lowercase().max(100),
                cued_only: Joi.boolean(),
                time_zone_offset: Joi.string().regex(regex.timeZoneOffset)
            }
        },
        show: {
            headers: {
                authorization: Joi.string().required()
            },
            params: {
                id: Joi.number().integer().min(1).required()
            },
            query: {
                time_zone_offset: Joi.string().regex(regex.timeZoneOffset)
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
