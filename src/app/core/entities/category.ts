/**
 * category
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { Entity } from './entity';
import { Subcategories } from './subcategories';

export interface Category extends Entity {
    name?: string;
    subcategories?: Subcategories;
}
