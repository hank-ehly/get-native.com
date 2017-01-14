/**
 * fuzzy-number.pipe
 * get-native.com
 *
 * Created by henryehly on 2017/01/11.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fuzzy'
})
export class FuzzyNumberPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (!value) {
            return '';
        } else if (typeof value !== 'number') {
            throw new TypeError(`[${this.constructor.name}] Value must be a number. Received '${value}' of type '${typeof value}'`);
        }

        let retVal: string = '';

        if (value <= 0) {
            retVal = '0';
        }

        else if (value > 0 && value < 1000) {
            retVal = value.toString();
        }

        else {
            let float = <number>value / 1000;
            let places = value >= 1000 && value < 10000 ? 1 : 0;
            retVal = float.toFixed(places) + 'k';
        }

        return retVal;
    }
}
