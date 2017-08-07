/**
 * page-not-found.component
 * get-native.com
 *
 * Created by henryehly on 2017/04/20.
 */

import { Component, OnInit } from '@angular/core';

import { Logger } from '../../core/logger/logger';

@Component({
    selector: 'gn-page-not-found',
    templateUrl: 'page-not-found.component.html',
    styleUrls: ['page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
    constructor(private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }
}
