/**
 * study-progress.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/13.
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Logger } from '../../core/logger/logger';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    moduleId: module.id,
    selector: 'gn-study-progress',
    templateUrl: 'study-progress.component.html',
    styleUrls: ['study-progress.component.css']
})
export class StudyProgressComponent implements OnInit, OnDestroy {
    @Input() progress: {
        countdown$: BehaviorSubject<number>,
        listening$: BehaviorSubject<number>,
        shadowing$: BehaviorSubject<number>,
         speaking$: BehaviorSubject<number>,
          writing$: BehaviorSubject<number>
    };

    constructor(private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }
}
