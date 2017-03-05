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
    [APIHandle.CUED_VIDEOS, {
        method: RequestMethod.Get,
        url: '/cued_videos',
        isProtected: true
    }],
    [APIHandle.STUDY_STATS, {
        method: RequestMethod.Get,
        url: '/study/stats',
        isProtected: true
    }],
    [APIHandle.STUDY_WRITING_HISTORY, {
        method: RequestMethod.Get,
        url: '/study/writing_history',
        isProtected: true,
        permitURLSearchParams: ['since', 'max_id']
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
        permitURLSearchParams: ['lang', 'count', 'max_id', 'subcategory_id', 'category_id', 'q']
    }],
    [APIHandle.VIDEO, {
        method: RequestMethod.Get,
        url: '/videos/:id',
        isProtected: true
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
    }]
]);
