/**
 * writing-session
 * get-native.com
 *
 * Created by henryehly on 2017/02/12.
 */

import { Entity, Question } from './index';

export interface WritingSession extends Entity {
    text: string;
    question: Question;
}
