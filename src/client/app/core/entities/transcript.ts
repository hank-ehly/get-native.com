/**
 * transcript
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Entity } from './entity';
import { Collocations } from './collocations';
import { Lang } from '../typings/lang';

export class Transcript extends Entity {
    text: string;
    lang: Lang;
    collocations: Collocations;
}
