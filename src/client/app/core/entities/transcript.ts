/**
 * transcript
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Entity } from './entity';

/* You shouldn't model this directly off of the DB schema. This should only include the info in the response. */
export class Transcript extends Entity {
    text: string;

    /* Todo: Create a 'Lang' model */
    lang: string;

    /* Todo: Create a 'Collocation' model */
    collocations: any[];
}
