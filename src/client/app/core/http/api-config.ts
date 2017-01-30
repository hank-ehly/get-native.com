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
    [APIHandle.CATEGORIES, {
        method: RequestMethod.Get,
        url: '/categories',
        isProtected: true
    }],
    [APIHandle.VIDEOS, {
        method: RequestMethod.Get,
        url: '/videos',
        isProtected: true
    }],
    [APIHandle.VIDEO, {
        method: RequestMethod.Get,
        url: '/videos/:id',
        isProtected: true
    }]
]);
