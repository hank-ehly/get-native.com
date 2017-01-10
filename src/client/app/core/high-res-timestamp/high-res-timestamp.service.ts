/**
 * high-res-timestamp.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/16.
 */

import { Injectable } from '@angular/core';
import { UTCDateService } from '../utc-date/utc-date.service';

@Injectable()
export class HighResTimestampService {
    constructor(private dateService: UTCDateService) {
    }

    toHumanReadable(timestamp: number): string {
        if (timestamp >= 600) {
            throw new RangeError(`${this.constructor.name}.fromSeconds cannot handle values over 600. Value was ${timestamp}`);
        }

        let nWholeSec = Math.floor(timestamp);
        let date = this.dateService.dateFromSeconds(nWholeSec);

        return `${date.getUTCMinutes()}:${this.dateService.getUTCPaddedSeconds(date)}`;
    }
}
