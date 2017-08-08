/**
 * date.pipe
 * getnativelearning.com
 *
 * Created by henryehly on 2017/02/12.
 */

import { Pipe, PipeTransform } from '@angular/core';

import { UTCDateService } from '../../core/utc-date/utc-date.service';

@Pipe({
    name: 'gnDate'
})
export class DatePipe implements PipeTransform {
    constructor(private dateService: UTCDateService) {
    }

    transform(value: any, ...args: any[]): any {
        const date = this.dateService.parse(value);
        return `${date.getUTCDate()} ${this.dateService.getTextMonth(date)} ${date.getUTCFullYear()}`;
    }
}
