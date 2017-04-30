/**
 * study-progress.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/13.
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Logger } from '../../core/logger/logger';

import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'gn-study-progress',
    templateUrl: 'study-progress.component.html',
    styleUrls: ['study-progress.component.css']
})
export class StudyProgressComponent implements OnInit, OnDestroy {
    @Input() progress: {
        listening$: Observable<number>,
        shadowing$: Observable<number>,
        speaking$: Observable<number>,
        writing$: Observable<number>
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
