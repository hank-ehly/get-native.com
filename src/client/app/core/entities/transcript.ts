/**
 * transcript
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Entity } from './entity';
import { Collocations } from './collocations';
import { LanguageCode } from '../typings/language-code';

export interface Transcript extends Entity {
    text: string;
    language_code: LanguageCode;
    collocations: Collocations;
}
