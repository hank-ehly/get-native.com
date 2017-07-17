/**
 * settings.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../core/navbar/navbar.service';
import { Logger } from '../core/logger/logger';

@Component({
    selector: 'gn-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {
    tabs: any[];
    selectedTab: any;

    constructor(private logger: Logger, private navbar: NavbarService) {
        this.tabs = [
            {name: 'general', path: './'},
            {name: 'security', path: 'security'},
            {name: 'notifications', path: 'notifications'}
        ];
    }

    get selectedTabDescription(): string {
        const titles: any = {
            general:       'View and update your login credentials.',
            security:      'Manage your account privacy settings.',
            notifications: 'Specify how getnative should be able to notify you.'
        };

        return !this.selectedTab ? titles.general : titles[this.selectedTab];
    }

    ngOnInit() {
        this.logger.debug(this, 'ngOnInit()');
        this.navbar.hideMagnifyingGlass();
    }
}
