/**
 * settings.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarService } from '../core/navbar/navbar.service';
import { Logger } from '../core/logger/logger';

import * as _ from 'lodash';

@Component({
    selector: 'gn-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {
    selectedTab: string;

    constructor(private logger: Logger, private navbar: NavbarService, private router: Router) {
    }

    ngOnInit() {
        this.logger.debug(this, 'ngOnInit');
        this.navbar.hideMagnifyingGlass();
        this.initSelectedTab();
    }

    setSelectedTab(tab: any) {
        this.selectedTab = tab;
    }

    // todo: refactor
    private initSelectedTab() {
        if (_.includes(this.router.url, 'security')) {
            this.selectedTab = 'security';
        } else if (_.includes(this.router.url, 'notifications')) {
            this.selectedTab = 'notifications';
        } else {
            this.selectedTab = 'general';
        }
    }
}
