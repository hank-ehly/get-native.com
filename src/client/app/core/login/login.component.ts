/**
 * login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/13.
 */

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    animations: [
        // TODO
    ]
})

export class LoginComponent {
    @Output() didRequestCloseModal = new EventEmitter();

    // TODO: Find 'e' type
    didClickOverlay(e: any): void {
        // TODO: This is hacky?
        if (['click-off-overlay', 'close-button', 'close-button-img'].indexOf(e.target.className) !== -1) {
            console.log('Close');
            this.didRequestCloseModal.emit();
        }
    }
}
