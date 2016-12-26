/**
 * speaker
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Entity } from './entity';

export class Speaker extends Entity {
    description: string;
    name: string;

    /* Todo: Model (as enum?) */
    lang: string;

    /* Todo: Model (as enum?) */
    gender: string;

    location: string;
}
