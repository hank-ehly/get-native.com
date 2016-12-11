/**
 * settings.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { NavbarService } from '../core/index';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.css']
})

export class SettingsComponent implements OnInit {
    tabs: string[];
    selectedTab: any;
    private _selectedTabDescription: string;

    constructor(private logger: Logger, private navbar: NavbarService, private route: ActivatedRoute) {
        this.tabs = ['general', 'security', 'notifications'];
    }

    get selectedTabDescription(): string {
        let titles: any = {
            general:       'View and update your login credentials.',
            security:      'Manage your account privacy settings.',
            notifications: 'Specify how Get Native should be able to notify you.'
        };

        if (!this.selectedTab) {
            return titles.general;
        } else {
            return titles[this.selectedTab];
        }
    }

    ngOnInit() {
        this.logger.debug('[SettingsComponent] ngOnInit()');
        this.navbar.setTitle('Hank Ehly');
        this.route.params.subscribe(this.paramsChanged.bind(this));
    }

    paramsChanged(params: Params) {
        this.selectedTab = params['tab'];
        this.logger.debug(`selectedTab: ${this.selectedTab}`);
    }

    classForTab(title: string) {
        let isExactMatch = this.selectedTab === title;
        let isDefault    = title === 'general' && [null, undefined].includes(this.selectedTab);

        return {'tab_active': isExactMatch || isDefault};
    }
}
