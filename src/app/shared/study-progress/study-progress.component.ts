/**
 * study-progress.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/13.
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Logger } from '../../core/logger/logger';

@Component({
    selector: 'gn-study-progress',
    templateUrl: 'study-progress.component.html',
    styleUrls: ['study-progress.component.scss']
})
export class StudyProgressComponent implements OnInit, OnDestroy {
    @Input() progress: any;

    constructor(private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }
}
