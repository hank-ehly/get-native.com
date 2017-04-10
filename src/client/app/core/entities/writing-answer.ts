/**
 * writing-answer
 * get-native.com
 *
 * Created by henryehly on 2017/02/12.
 */

import { Entity } from './entity';
import { WritingQuestion } from './writing-question';

export interface WritingAnswer extends Entity {
    answer: string;
    writing_question: WritingQuestion;
}
