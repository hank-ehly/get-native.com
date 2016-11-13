/**
 * app.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component } from '@angular/core';
import './operators';

@Component({
    moduleId: module.id,
    selector: 'gn-app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    isCookieCompliant: boolean = false;

    didComply(): void {
        // TODO: Logger service
        console.debug('[AppComponent] didComply');

        // TODO: Store in cookie / local storage
        // TODO: Cookie / LocalStorage service
        // TODO: Animate like iOS (bounce up a little then down and out)
        this.isCookieCompliant = true;
    }
}
