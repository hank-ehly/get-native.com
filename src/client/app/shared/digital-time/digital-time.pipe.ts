/**
 * high-res-timestamp.pipe
 * get-native.com
 *
 * Created by henryehly on 2017/01/11.
 */

import { Pipe, PipeTransform } from '@angular/core';

import { UTCDateService } from '../../core/index';

@Pipe({
    name: 'digitalTime'
})

export class DigitalTimePipe implements PipeTransform {
    constructor(private dateService: UTCDateService) {
    }

    transform(value: any, ...args: any[]): any {
        if (value >= 600) {
            throw new RangeError(`${this.constructor.name}.fromSeconds cannot handle values over 600. Value was ${value}`);
        }

        let seconds = Math.floor(value);
        let date = this.dateService.dateFromSeconds(seconds);

        return `${date.getUTCMinutes()}:${this.dateService.getUTCPaddedSeconds(date)}`;
    }
}
