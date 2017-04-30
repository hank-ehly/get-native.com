/**
 * results.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/12.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Logger } from '../../core/logger/logger';

@Component({
    moduleId: module.id,
    templateUrl: 'results.component.html',
    styleUrls: ['results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
    constructor(private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }
}
