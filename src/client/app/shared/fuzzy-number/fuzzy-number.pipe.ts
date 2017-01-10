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
        /* Todo: Make sure 'value' is a number */

        if (value <= 0) {
            return 0;
        }

        else if (value < 1000) {
            return value;
        }

        else if (value >= 1000 && value < 10000) {
            let x = <number>value * 0.001;
            return x.toFixed(1) + 'k';
        }

        else {
            return value;
        }
    }
}
