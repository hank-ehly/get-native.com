/**
 * endpoints
 * getnativelearning.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { RequestMethod } from '@angular/http';

import { APIHandle } from './api-handle';

export const APIConfig = new Map<APIHandle, any>([
    [APIHandle.CREATE_SESSION, {
        method: RequestMethod.Post,
        url: '/sessions',
        isProtected: false
    }],
    [APIHandle.CREATE_USER, {
        method: RequestMethod.Post,
        url: '/users',
        isProtected: false
    }],
    [APIHandle.DELETE_USER, {
        method: RequestMethod.Delete,
        url: '/users',
        isProtected: true
    }],
    [APIHandle.STUDY_STATS, {
        method: RequestMethod.Get,
        url: '/study/:lang/stats',
        isProtected: true
    }],
    [APIHandle.WRITING_ANSWERS, {
        method: RequestMethod.Get,
        url: '/study/:lang/writing_answers',
        isProtected: true,
        permitURLSearchParams: ['since', 'max_id', 'time_zone_offset']
    }],
    [APIHandle.CATEGORIES, {
        method: RequestMethod.Get,
        url: '/categories',
        isProtected: false,
        permitURLSearchParams: ['lang']
    }],
    [APIHandle.VIDEOS, {
        method: RequestMethod.Get,
        url: '/videos',
        isProtected: false,
        permitURLSearchParams: [
            'lang', 'count', 'max_id', 'subcategory_id', 'category_id', 'q', 'cued_only', 'time_zone_offset', 'interface_lang'
        ]
    }],
    [APIHandle.VIDEO, {
        method: RequestMethod.Get,
        url: '/videos/:id',
        isProtected: false,
        permitURLSearchParams: ['time_zone_offset', 'lang']
    }],
    [APIHandle.LIKE_VIDEO, {
        method: RequestMethod.Post,
        url: '/videos/:id/like',
        isProtected: true
    }],
    [APIHandle.UNLIKE_VIDEO, {
        method: RequestMethod.Post,
        url: '/videos/:id/unlike',
        isProtected: true
    }],
    [APIHandle.UPDATE_USER, {
        method: RequestMethod.Patch,
        url: '/users',
        isProtected: true
    }],
    [APIHandle.EDIT_PASSWORD, {
        method: RequestMethod.Post,
        url: '/users/password',
        isProtected: true
    }],
    [APIHandle.EDIT_EMAIL, {
        method: RequestMethod.Post,
        url: '/users/:id/email',
        isProtected: true
    }],
    [APIHandle.CONFIRM_EMAIL, {
        method: RequestMethod.Post,
        url: '/confirm_email',
        isProtected: false
    }],
    [APIHandle.CONFIRM_EMAIL_UPDATE, {
        method: RequestMethod.Post,
        url: '/confirm_email_update',
        isProtected: false
    }],
    [APIHandle.RESEND_CONFIRMATION_EMAIL, {
        method: RequestMethod.Post,
        url: '/resend_confirmation_email',
        isProtected: false
    }],
    [APIHandle.QUEUE_VIDEO, {
        method: RequestMethod.Post,
        url: '/videos/:id/queue',
        isProtected: true
    }],
    [APIHandle.DEQUEUE_VIDEO, {
        method: RequestMethod.Post,
        url: '/videos/:id/dequeue',
        isProtected: true
    }],
    [APIHandle.START_STUDY_SESSION, {
        method: RequestMethod.Post,
        url: '/study',
        isProtected: true
    }],
    [APIHandle.COMPLETE_STUDY_SESSION, {
        method: RequestMethod.Post,
        url: '/study/complete',
        isProtected: true
    }],
    [APIHandle.WRITING_QUESTIONS, {
        method: RequestMethod.Get,
        url: '/videos/:id/writing_questions',
        isProtected: true,
        permitURLSearchParams: ['count']
    }],
    [APIHandle.CREATE_WRITING_ANSWER, {
        method: RequestMethod.Post,
        url: '/study/writing_answers',
        isProtected: true
    }],
    [APIHandle.ME, {
        method: RequestMethod.Get,
        url: '/users/me',
        isProtected: true
    }],
    [APIHandle.SEND_PASSWORD_RESET_LINK, {
        method: RequestMethod.Post,
        url: '/send_password_reset_link',
        isProtected: false
    }]
]);
