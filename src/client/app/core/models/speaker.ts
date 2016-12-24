/**
 * speaker
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { GetNativeEntity } from './get-native-entity';

export class Speaker extends GetNativeEntity {
    description: string;
    name: string;

    /* Todo: Model (as enum?) */
    lang: string;

    /* Todo: Model (as enum?) */
    gender: string;

    location: string;
}
