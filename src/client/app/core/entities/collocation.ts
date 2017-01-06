/**
 * collocation
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { Entity, UsageExamples } from './index';

export interface Collocation extends Entity {
    text: string;
    description: string;
    pronunciation: string;
    usage_examples: UsageExamples;
}
