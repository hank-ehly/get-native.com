/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit } from '@angular/core';
import './operators';

import { Logger } from 'angular2-logger/core';
import { LocalStorageService } from './core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    showCookieComplianceDialog: boolean;
    showLoginModal: boolean;

    constructor(private logger: Logger, private localStorageService: LocalStorageService) {
        this.showLoginModal = false;
    }

    ngOnInit(): void {
        this.showCookieComplianceDialog = !this.localStorageService.getItem('accept-local-storage');
    }
}
