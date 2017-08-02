/**
 * footer.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Logger } from '../../core/logger/logger';

@Component({
    selector: 'gn-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
    year = new Date().getFullYear();

    constructor(private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
    }
}
