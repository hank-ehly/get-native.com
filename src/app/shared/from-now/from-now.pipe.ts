import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';
import { UTCDateService } from '../../core/utc-date/utc-date.service';

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
