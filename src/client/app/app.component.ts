/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, OnInit, HostListener } from '@angular/core';

import { LocalStorageService, kAcceptLocalStorage } from './core/index';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    showComplianceDialog: boolean;
    showLoginModal: boolean;

    authenticated: boolean = true;

    constructor(private logger: Logger, private localStorageService: LocalStorageService) {
        this.showLoginModal = false;
    }

    @HostListener('window:storage', ['$event']) onStorageEvent(ev: StorageEvent) {
        this.localStorageService.broadcastStorageEvent(ev);
    }

    ngOnInit(): void {
        this.showComplianceDialog = !this.localStorageService.getItem(kAcceptLocalStorage);
    }
}
