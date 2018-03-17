/**
 * privacy.component
 * getnative.org
 *
 * Created by henryehly on 2016/11/07.
 */

import { Component, OnInit } from '@angular/core';

import { Logger } from '../core/logger/logger';

@Component({
    selector: 'gn-privacy',
    templateUrl: 'privacy.component.html',
    styleUrls: ['privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

    constructor(private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

}
