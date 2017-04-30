/**
 * study-progress.service
 * get-native.com
 *
 * Created by henryehly on 2017/04/30.
 */

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StudyProgressService {
    listening$ = new BehaviorSubject<number>(0);
    shadowing$ = new BehaviorSubject<number>(0);
    speaking$  = new BehaviorSubject<number>(0);
    writing$   = new BehaviorSubject<number>(0);

    constructor() {
    }
}
