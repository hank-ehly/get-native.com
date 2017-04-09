/**
 * writing-answer
 * get-native.com
 *
 * Created by henryehly on 2017/02/12.
 */

import { Entity } from './entity';
import { Question } from './question';

export interface WritingAnswer extends Entity {
    text: string;
    question: Question;
}
