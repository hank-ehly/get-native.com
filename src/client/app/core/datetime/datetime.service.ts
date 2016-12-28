/**
 * datetime.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/28.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {
    getWordDay(datetime: string): string {
        return datetime.split(' ')[0];
    }

    getWordMonth(datetime: string): string {
        return datetime.split(' ')[1];
    }

    getNumericDay(datetime: string): string {
        return datetime.split(' ')[2];
    }

    getTime(datetime: string): string {
        return datetime.split(' ')[3];
    }

    getTimeZone(datetime: string): string {
        return datetime.split(' ')[4];
    }

    getYear(datetime: string): string {
        return datetime.split(' ')[5];
    }
}
