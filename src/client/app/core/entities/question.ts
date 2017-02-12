/**
 * question
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { Entity } from './entity';

export interface Question extends Entity {
    text: string;
    example_answer?: string;
}
