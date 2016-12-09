/**
 * settings.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../core/index';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.css']
})

export class SettingsComponent implements OnInit {
    activeTab: string;

    constructor(private logger: Logger, private navbarService: NavbarService) {
    }

    ngOnInit() {
        this.logger.debug('[SettingsComponent] ngOnInit()');

        this.navbarService.setTitle('Hank Ehly');
    }

    setActiveTab(value: string) {
        this.activeTab = value;
    }
}
