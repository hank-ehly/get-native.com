/**
 * tos.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/10.
 */

import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Logger } from '../core/logger/logger';

@Component({
    selector: 'gn-tos',
    templateUrl: 'tos.component.html',
    styleUrls: ['tos.component.scss']
})
export class TOSComponent implements OnInit {

    constructor(private logger: Logger, @Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    jumpTo(fragment: string) {
        if (isPlatformBrowser(this.platformId)) {
            document.querySelector('#' + fragment).scrollIntoView();
        }
    }

}
