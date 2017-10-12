/**
 * study-session-section-timer
 * getnativelearning.com
 *
 * Created by henryehly on 2017/04/30.
 */

import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import * as _ from 'lodash';

export class StudySessionSectionTimer extends Observable<number> {
    constructor(studyTime: number) {
        super();
        const seconds = _.floor(studyTime / 4);
        return TimerObservable.create(0, 1000).map((i: number) => _.round(((i + 1) / seconds) * 100)).take(seconds);
    }
}
