/**
 * writing.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Logger } from '../../core/logger/logger';

@Component({
    moduleId: module.id,
    templateUrl: 'writing.component.html',
    styleUrls: ['writing.component.css']
})
export class WritingComponent implements OnInit, OnDestroy {
    constructor(private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }
}
