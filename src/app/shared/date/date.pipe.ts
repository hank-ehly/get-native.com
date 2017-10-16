/**
 * date.pipe
 * getnativelearning.com
 *
 * Created by henryehly on 2017/02/12.
 */

import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

import { UTCDateService } from '../../core/utc-date/utc-date.service';

import * as moment from 'moment';

@Pipe({
    name: 'gnDate'
})
export class DatePipe implements PipeTransform {
    constructor(private dateService: UTCDateService, @Inject(LOCALE_ID) private localeId: string) {
    }

    transform(value: any, ...args: any[]): any {
        const date = this.dateService.parse(value);
        return moment(date).locale(this.localeId).format('ll');
    }
}
