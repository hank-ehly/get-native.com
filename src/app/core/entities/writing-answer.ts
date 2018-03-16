/**
 * writing-answer
 * getnative.org
 *
 * Created by henryehly on 2017/02/12.
 */

import { Entity } from './entity';
import { WritingQuestion } from './writing-question';

export interface WritingAnswer extends Entity {
    answer: string;
    writing_question: WritingQuestion;
    word_count?: number;
    words_per_minute?: number;
}
