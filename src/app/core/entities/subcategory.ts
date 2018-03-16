/**
 * subcategory
 * getnative.org
 *
 * Created by henryehly on 2016/12/24.
 */

import { Entity } from './entity';

export interface Subcategory extends Entity {
    category_id?: number;
    name: string;
}
