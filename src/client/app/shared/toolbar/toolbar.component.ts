/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent {
    constructor(private logger: Logger, private router: Router) {
    }

    /* TODO: Implement */
    onLogout(): void {
        this.logger.info('[ToolbarComponent]: onLogout()');
        this.router.navigate(['']);
    }
}
