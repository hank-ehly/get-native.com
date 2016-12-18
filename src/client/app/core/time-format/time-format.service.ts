/**
 * time-format.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/16.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class TimeFormatService {
    constructor() {
    }

    fromSeconds(seconds: number): string {
        if (seconds >= 600) {
            // RangeError
        }

        let retVal: string;
        let floor = Math.floor(seconds);
        if (floor < 10) {
            retVal = `0:0${floor}`;
        } else if (floor >=10 && floor < 60) {
            retVal = `0:${floor}`;
        } else if (floor >= 60) {
            let minutes = Math.floor(floor/60);
            let remainder = floor % 60;
            if (remainder < 10) {
                retVal = `${minutes}:0${remainder}`;
            } else {
                retVal = `${minutes}:${remainder}`;
            }
        } else {
            // error
        }
        return retVal;
    }
}
