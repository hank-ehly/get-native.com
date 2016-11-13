/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component } from '@angular/core';
import './operators';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    isCookieCompliant: boolean = false;

    constructor(private logger: Logger) {}

    didComply(): void {
        this.logger.debug('[AppComponent]: didComply()');
        // TODO: Store in cookie / local storage
        // TODO: Cookie / LocalStorage service
        this.isCookieCompliant = true;
    }
}
