import { Pipe, PipeTransform } from '@angular/core';

import { UTCDateService } from '../../core/utc-date/utc-date.service';

import * as moment from 'moment';

@Pipe({
    name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

    constructor(private date: UTCDateService) {
    }

    transform(value: string, args?: any): any {
        return moment(this.date.parse(value)).fromNow();
    }

}
