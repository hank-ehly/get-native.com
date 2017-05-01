/**
 * session-timer
 * get-native.com
 *
 * Created by henryehly on 2017/04/30.
 */

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

export class SessionTimer extends Observable<number> {
    constructor(studyTime: number) {
        super();

        const seconds = _.floor(studyTime / 4);
        return IntervalObservable.create(1000).take(seconds).map(t => {
            return _.round(((t + 1) / seconds) * 100);
        });
    }
}
