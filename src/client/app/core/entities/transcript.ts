/**
 * transcript
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Entity } from './entity';
import { Language } from '../typings/language';
import { Collocations } from './collocations';

export interface Transcript extends Entity {
    text?: string;
    language?: Language;
    collocations?: Collocations;
}
