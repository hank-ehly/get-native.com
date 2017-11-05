/**
 * endpoints
 * getnativelearning.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { APIHandle } from './api-handle';

export const APIConfig = new Map<APIHandle, any>([
    [APIHandle.CREATE_SESSION, {
        method: 'POST',
        url: '/sessions',
        isProtected: false
    }],
    [APIHandle.CREATE_USER, {
        method: 'POST',
        url: '/users',
        isProtected: false
    }],
    [APIHandle.DELETE_USER, {
        method: 'DELETE',
        url: '/users',
        isProtected: true
    }],
    [APIHandle.STUDY_STATS, {
        method: 'GET',
        url: '/study/:lang/stats',
        isProtected: true
    }],
    [APIHandle.WRITING_ANSWERS, {
        method: 'GET',
        url: '/study/:lang/writing_answers',
        isProtected: true,
        permitURLSearchParams: ['since', 'max_id', 'time_zone_offset']
    }],
    [APIHandle.CATEGORIES, {
        method: 'GET',
        url: '/categories',
        isProtected: false,
        permitURLSearchParams: ['lang']
    }],
    [APIHandle.VIDEOS, {
        method: 'GET',
        url: '/videos',
        isProtected: false,
        permitURLSearchParams: [
            'lang', 'count', 'max_id', 'subcategory_id', 'category_id', 'q', 'cued_only', 'time_zone_offset', 'interface_lang'
        ]
    }],
    [APIHandle.VIDEO, {
        method: 'GET',
        url: '/videos/:id',
        isProtected: false,
        permitURLSearchParams: ['time_zone_offset', 'lang']
    }],
    [APIHandle.LIKE_VIDEO, {
        method: 'POST',
        url: '/videos/:id/like',
        isProtected: true
    }],
    [APIHandle.UNLIKE_VIDEO, {
        method: 'POST',
        url: '/videos/:id/unlike',
        isProtected: true
    }],
    [APIHandle.UPDATE_USER, {
        method: 'PATCH',
        url: '/users',
        isProtected: true
    }],
    [APIHandle.EDIT_PASSWORD, {
        method: 'POST',
        url: '/users/password',
        isProtected: true
    }],
    [APIHandle.EDIT_EMAIL, {
        method: 'POST',
        url: '/users/:id/email',
        isProtected: true
    }],
    [APIHandle.CONFIRM_EMAIL, {
        method: 'POST',
        url: '/confirm_email',
        isProtected: false
    }],
    [APIHandle.CONFIRM_EMAIL_UPDATE, {
        method: 'POST',
        url: '/confirm_email_update',
        isProtected: false
    }],
    [APIHandle.RESEND_CONFIRMATION_EMAIL, {
        method: 'POST',
        url: '/resend_confirmation_email',
        isProtected: false
    }],
    [APIHandle.QUEUE_VIDEO, {
        method: 'POST',
        url: '/videos/:id/queue',
        isProtected: true
    }],
    [APIHandle.DEQUEUE_VIDEO, {
        method: 'POST',
        url: '/videos/:id/dequeue',
        isProtected: true
    }],
    [APIHandle.START_STUDY_SESSION, {
        method: 'POST',
        url: '/study',
        isProtected: true
    }],
    [APIHandle.COMPLETE_STUDY_SESSION, {
        method: 'POST',
        url: '/study/complete',
        isProtected: true
    }],
    [APIHandle.WRITING_QUESTIONS, {
        method: 'GET',
        url: '/videos/:id/writing_questions',
        isProtected: true,
        permitURLSearchParams: ['count']
    }],
    [APIHandle.CREATE_WRITING_ANSWER, {
        method: 'POST',
        url: '/study/writing_answers',
        isProtected: true
    }],
    [APIHandle.ME, {
        method: 'GET',
        url: '/users/me',
        isProtected: true
    }],
    [APIHandle.SEND_PASSWORD_RESET_LINK, {
        method: 'POST',
        url: '/send_password_reset_link',
        isProtected: false
    }],
    [APIHandle.RESET_PASSWORD, {
        method: 'POST',
        url: '/reset_password',
        isProtected: false
    }],
    [APIHandle.DELETE_PROFILE_IMAGE, {
        method: 'DELETE',
        url: '/users/profile_image',
        isProtected: true
    }],
    [APIHandle.UPLOAD_PROFILE_IMAGE, {
        method: 'POST',
        url: '/users/profile_image',
        isProtected: true
    }]
]);
