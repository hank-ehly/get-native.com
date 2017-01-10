/**
 * utc-date.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/31.
 */

import { Injectable } from '@angular/core';

import { DateTime } from '../typings/datetime';
import { WEEKDAYS } from './weekdays';
import { MONTHS } from './months';

@Injectable()
export class UTCDateService {
    parse(datetime: DateTime): Date {
    let units: string[] = datetime.split(' ');

    let year    = +units[units.length - 1];
    let month   = MONTHS.indexOf(units[1]);
    let date    = +units[2];

    let time    = units[3].split(':');
    let hours   = +time[0];
    let minutes = +time[1];
    let seconds = +time[2];

    return new Date(Date.UTC(year, month, date, hours, minutes, seconds));
}

    getWeekDay(date: Date): string {
        return WEEKDAYS[date.getUTCDay()];
    }

    getTextMonth(date: Date): string {
        return MONTHS[date.getUTCMonth()];
    }
}
