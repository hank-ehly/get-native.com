/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component, ViewEncapsulation } from '@angular/core';
import './operators';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-app',
    templateUrl: 'app.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class AppComponent {
    isCookieCompliant: boolean = false;
    shouldShowLoginModal: boolean = false;

    constructor(private logger: Logger) {
    }

    didComply(): void {
        this.logger.debug('[AppComponent]: didComply()');
        // TODO: Store in cookie / local storage
        // TODO: Cookie / LocalStorage service
        this.isCookieCompliant = true;
    }

    showLoginModal(): void {
        this.logger.debug('[AppComponent]: showLoginModal()');

        this.shouldShowLoginModal = true;

        // TODO: You may have to move the 'gn-app' to the <body> tag to avoid doing this
        document.body.style.overflow = 'hidden';
    }

    hideLoginModal(): void {
        this.shouldShowLoginModal = false;
        document.body.style.overflow = 'visible';
    }
}
