/**
 * collocation
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { Entity } from './entity';
import { UsageExamples } from './usage-examples';

export class Collocation extends Entity {
    text: string;
    description: string;
    usage_examples: UsageExamples;
}
