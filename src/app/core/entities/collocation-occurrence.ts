/**
 * collocation-occurrence
 * get-native.com
 *
 * Created by henryehly on 2016/12/29.
 */

import { Entity } from './entity';
import { Entities } from './entities';
import { UsageExample } from './usage-example';

export interface CollocationOccurrence extends Entity {
    text: string;
    description: string;
    ipa_spelling: string;
    usage_examples: Entities<UsageExample>;
}
