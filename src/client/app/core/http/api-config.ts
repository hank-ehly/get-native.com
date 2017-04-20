/**
 * endpoints
 * get-native.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { RequestMethod } from '@angular/http';

import { APIHandle } from './api-handle';

export const APIConfig = new Map<APIHandle, any>([
    [APIHandle.LOGIN, {
        method: RequestMethod.Post,
        url: '/login',
        isProtected: false
    }],
    [APIHandle.REGISTER, {
        method: RequestMethod.Post,
        url: '/register',
        isProtected: false
    }],
    [APIHandle.STUDY_STATS, {
        method: RequestMethod.Get,
        url: '/study/stats/:lang',
        isProtected: true
    }],
    [APIHandle.WRITING_ANSWERS, {
        method: RequestMethod.Get,
        url: '/study/writing_answers/:lang',
        isProtected: true,
        permitURLSearchParams: ['since', 'max_id', 'time_zone_offset']
    }],
    [APIHandle.CATEGORIES, {
        method: RequestMethod.Get,
        url: '/categories',
        isProtected: true
    }],
    [APIHandle.VIDEOS, {
        method: RequestMethod.Get,
        url: '/videos',
        isProtected: true,
        permitURLSearchParams: ['lang', 'count', 'max_id', 'subcategory_id', 'category_id', 'q', 'cued_only', 'time_zone_offset']
    }],
    [APIHandle.VIDEO, {
        method: RequestMethod.Get,
        url: '/videos/:id',
        isProtected: true,
        permitURLSearchParams: ['time_zone_offset']
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
    [APIHandle.EDIT_ACCOUNT, {
        method: RequestMethod.Patch,
        url: '/account',
        isProtected: true
    }],
    [APIHandle.EDIT_PASSWORD, {
        method: RequestMethod.Post,
        url: '/account/password',
        isProtected: true
    }],
    [APIHandle.EDIT_EMAIL, {
        method: RequestMethod.Post,
        url: '/account/email',
        isProtected: true
    }],
    [APIHandle.ACCOUNT, {
        method: RequestMethod.Get,
        url: '/account',
        isProtected: true
    }],
    [APIHandle.CONFIRM_EMAIL, {
        method: RequestMethod.Post,
        url: '/confirm_email',
        isProtected: false,
        permitURLSearchParams: ['token']
    }]
]);
