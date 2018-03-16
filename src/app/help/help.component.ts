/**
 * help.component
 * getnative.org
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit } from '@angular/core';

import { Logger } from '../core/logger/logger';

@Component({
    selector: 'gn-help',
    templateUrl: 'help.component.html'
})
export class HelpComponent implements OnInit {

    constructor(private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

}
