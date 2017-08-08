/**
 * settings.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from '../core/logger/logger';

import * as _ from 'lodash';

@Component({
    selector: 'gn-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {
    selectedTab: string;

    constructor(private logger: Logger, private router: Router) {
    }

    ngOnInit() {
        this.logger.debug(this, 'ngOnInit');
        this.selectedTab = this.getSelectedTab();
    }

    setSelectedTab(tab: string) {
        this.selectedTab = tab;
    }

    getSelectedTab(): string {
        if (this.selectedTab) {
            return this.selectedTab;
        }

        let tabValue = 'general';
        if (_.includes(this.router.url, 'security')) {
            tabValue = 'security';
        } else if (_.includes(this.router.url, 'notifications')) {
            tabValue = 'notifications';
        } else if (_.includes(this.router.url, 'activity')) {
            tabValue = 'activity';
        }

        return tabValue;
    }
}
