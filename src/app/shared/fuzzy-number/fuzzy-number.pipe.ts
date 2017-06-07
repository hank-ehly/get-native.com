/**
 * fuzzy-number.pipe
 * get-native.com
 *
 * Created by henryehly on 2017/01/11.
 */

import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({
    name: 'fuzzy'
})
export class FuzzyNumberPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        let result = '';

        if (!_.isNumber(value)) {
            return result;
        } else if (_.lte(value, 0)) {
            result = '0';
        } else if (_.inRange(value, 1000)) {
            result = value.toString();
        } else {
            let float = <number>value / 1000;
            let places = _.inRange(value, 1000, 10000) ? 1 : 0;
            result = float.toFixed(places) + 'k';
        }

        return result;
    }
}
