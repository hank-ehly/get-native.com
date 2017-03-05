/**
 * category
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { Entity, Subcategories } from './index';

export interface Category extends Entity {
    name?: string;
    subcategories?: Subcategories;
}
