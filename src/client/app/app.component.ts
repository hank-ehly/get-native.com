/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, ViewChild } from '@angular/core';
import './operators';

import { Logger } from 'angular2-logger/core';
import { LoginModalComponent, LoginModalService } from './core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    isCookieCompliant: boolean = false;

    @ViewChild(LoginModalComponent) loginComponent: LoginModalComponent;

    constructor(private logger: Logger, private loginModalService: LoginModalService) {
        loginModalService.showModal$.subscribe(() => this.showLoginModal());
    }

    didComply(): void {
        this.logger.debug('[AppComponent]: didComply()');
        // TODO: Store in cookie / local storage
        // TODO: Cookie / LocalStorage service
        this.isCookieCompliant = true;
    }

    showLoginModal(): void {
        this.logger.debug('[AppComponent]: showLoginModal()');

        // TODO: You may have to move the 'gn-app' to the <body> tag to avoid doing this
        document.body.style.overflow = 'hidden';

        this.loginComponent.isLoginModalVisible = true;
    }

    hideLoginModal(): void {
        this.logger.debug('[AppComponent]: hideLoginModal()');
        document.body.style.overflow = 'visible';
        this.loginComponent.isLoginModalVisible = false;
    }
}
