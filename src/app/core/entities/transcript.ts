/**
 * transcript
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Entity } from './entity';
import { Language } from '../typings/language';
import { Entities } from './entities';
import { CollocationOccurrence } from './collocation-occurrence';

export interface Transcript extends Entity {
    text?: string;
    language?: Language;
    collocation_occurrences?: Entities<CollocationOccurrence>;
}
