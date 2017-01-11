/**
 * fuzzy-number.pipe
 * get-native.com
 *
 * Created by henryehly on 2017/01/11.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fuzzyNumber'
})
export class FuzzyNumberPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        if (typeof value !== 'number') {
            throw new TypeError(`[${this.constructor.name}] Value must be a number. Received '${value}' of type '${typeof value}'`);
        }

        if (value <= 0) {
            return 0;
        }

        else if (value > 0 && value < 1000) {
            return value;
        }

        else {
            let float = <number>value / 1000;
            let places = value >= 1000 && value < 10000 ? 1 : 0;
            return float.toFixed(places) + 'k';
        }
    }
}
