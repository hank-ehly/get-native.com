/**
 * privacy.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/07.
 */

import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../../core/navbar/navbar.service';
import { environment } from '../../../environments/environment';
import { Logger } from '../../core/logger/logger';

@Component({
    selector: 'gn-privacy',
    templateUrl: 'privacy.component.html',
    styleUrls: ['privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
    moderator: string = environment.moderator;

    constructor(private navbar: NavbarService, private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.navbar.hideMagnifyingGlass();
    }
}
