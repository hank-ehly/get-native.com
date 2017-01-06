/**
 * transcript
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Entity, Collocations } from './index';
import { LangCode } from '../typings/lang-code';

export interface Transcript extends Entity {
    text: string;

    /* Todo: Change name to 'code' or 'lang_code' to avoid confusion */
    lang: LangCode;
    collocations: Collocations;
}
