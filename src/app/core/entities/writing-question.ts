/**
 * writing-question
 * getnative.org
 *
 * Created by henryehly on 2016/12/29.
 */

import { Entity } from './entity';

export interface WritingQuestion extends Entity {
    text: string;
    example_answer?: string;
}
