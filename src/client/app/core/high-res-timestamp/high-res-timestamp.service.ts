/**
 * high-res-timestamp.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/16.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class HighResTimestampService {
    toHumanReadable(timestamp: number): string {
        if (timestamp >= 600) {
            throw new RangeError(`${this.constructor.name}.fromSeconds cannot handle values over 600. Value was ${timestamp}`);
        }

        let nWholeSec = Math.floor(timestamp);
        let nWholeMin = Math.floor(nWholeSec / 60);

        let nRetSec = nWholeSec % 60;
        let sRetSec = nRetSec < 10 ? `0${nRetSec}` : nRetSec.toString();
        let sRetMin = nWholeMin < 1 ? '0' : nWholeMin.toString();

        return `${sRetMin}:${sRetSec}`;
    }
}
