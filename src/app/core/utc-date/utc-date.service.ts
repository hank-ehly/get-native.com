/**
 * utc-date.service
 * getnativelearning.com
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
        const units: string[] = datetime.split(' ');

        const year = +units[units.length - 1];
        const month = MONTHS.indexOf(units[1]);
        const date = +units[2];

        const time = units[3].split(':');
        const hours = +time[0];
        const minutes = +time[1];
        const seconds = +time[2];

        return new Date(Date.UTC(year, month, date, hours, minutes, seconds));
    }

    getWeekDay(date: Date): string {
        return WEEKDAYS[date.getUTCDay()];
    }

    getTextMonth(date: Date): string {
        return MONTHS[date.getUTCMonth()];
    }

    dateFromSeconds(seconds: number): Date {
        const milliseconds = 1000 * seconds;
        return new Date(milliseconds);
    }

    getUTCPaddedSeconds(date: Date): string {
        const seconds: string = date.getUTCSeconds().toString();
        return `0${seconds}`.slice(-2);
    }

    getDaysAgoFromDate(days: number, since?: Date): number {
        const daysAgo = 1000 * 60 * 60 * 24 * days;
        const sinceDate = since ? since : new Date();
        return sinceDate.getTime() - daysAgo;
    }
}
