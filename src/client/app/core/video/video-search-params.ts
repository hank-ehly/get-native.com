/**
 * video-search-params
 * get-native.com
 *
 * Created by henryehly on 2017/02/01.
 */

import { LangCode, Category, Topic } from '../index';

export interface VideoSearchParams {
    lang?: LangCode;
    count?: number;
    maxId?: number;
    topic?: Topic;
    category?: Category;
    query?: string;
}
