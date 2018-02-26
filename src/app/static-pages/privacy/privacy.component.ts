/**
 * privacy.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/07.
 */

import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { Logger } from '../../core/logger/logger';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'gn-privacy',
    templateUrl: 'privacy.component.html',
    styleUrls: ['privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

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
