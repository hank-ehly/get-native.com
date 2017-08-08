/**
 * category
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { Entity } from './entity';
import { Entities } from './entities';
import { Subcategory } from './subcategory';

export interface Category extends Entity {
    name?: string;
    subcategories?: Entities<Subcategory>;
}
