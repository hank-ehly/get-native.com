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

    /* Todo: Change name to 'code' or 'lang_code' to avoid confusion */
    lang: LanguageCode;
    collocations: Collocations;
}
