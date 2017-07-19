/**
 * tos.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/10.
 */

import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../../core/navbar/navbar.service';
import { Logger } from '../../core/logger/logger';

@Component({
    selector: 'gn-tos',
    templateUrl: 'tos.component.html',
    styleUrls: ['tos.component.scss']
})
export class TOSComponent implements OnInit {
    constructor(private navbar: NavbarService, private logger: Logger) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
        this.navbar.hideMagnifyingGlass();
    }
}
