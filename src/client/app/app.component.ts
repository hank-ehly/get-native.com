/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import './operators';

import { Logger } from 'angular2-logger/core';
import { LoginComponent } from './core/login/login.component';

@Component({
    moduleId: module.id,
    selector: 'gn-app',
    templateUrl: 'app.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class AppComponent {
    isCookieCompliant: boolean = false;
    shouldShowLoginModal: boolean = false;

    @ViewChild(LoginComponent) private loginComponent: LoginComponent;

    constructor(private logger: Logger) {
    }

    didComply(): void {
        this.logger.debug('[AppComponent]: didComply()');
        // TODO: Store in cookie / local storage
        // TODO: Cookie / LocalStorage service
        this.isCookieCompliant = true;
    }

    showSignInModal(): void {
        this.logger.debug('[AppComponent]: showSignInModal()');

        // TODO: You may have to move the 'gn-app' to the <body> tag to avoid doing this
        document.body.style.overflow = 'hidden';

        this.loginComponent.isVisible = true;
    }

    closeLoginModal(): void {
        this.logger.debug('[AppComponent]: closeLoginModal()');
        document.body.style.overflow = 'visible';
        this.loginComponent.isVisible = false;
    }
}
