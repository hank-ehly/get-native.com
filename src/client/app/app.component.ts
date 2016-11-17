/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, ViewChild, OnInit } from '@angular/core';
import './operators';

import { Logger } from 'angular2-logger/core';
import { LoginModalComponent, LoginModalService } from './core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    showCookieComplianceDialog: boolean;
    /* Note: Use @ViewChild when you need to access something inside the child; otherwise, connect outputs within template */
    @ViewChild(LoginModalComponent) loginComponent: LoginModalComponent;

    constructor(private logger: Logger, private loginModalService: LoginModalService) {
        loginModalService.showModal$.subscribe(() => this.showLoginModal());
    }

    ngOnInit(): void {
        /* TODO: Determine via service */
        this.showCookieComplianceDialog = true;
    }

    showLoginModal(): void {
        this.logger.debug('[AppComponent]: showLoginModal()');
        /* TODO: Is there a more "Angular" way to do this? */
        /* REF: http://plnkr.co/edit/AuFMJVHpk9OaLr62puS1?p=preview */
        document.body.style.overflow = 'hidden';
        this.loginComponent.isLoginModalVisible = true;
    }

    hideLoginModal(): void {
        this.logger.debug('[AppComponent]: hideLoginModal()');
        document.body.style.overflow = 'visible';
        this.loginComponent.isLoginModalVisible = false;
    }
}
