/**
 * email-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-email-login',
    templateUrl: 'email-login.component.html',
    styleUrls: ['email-login.component.css']
})

export class EmailLoginComponent {
    @Output() setModalView = new EventEmitter<string>();

    onSetModalView(view: string) {
        this.setModalView.emit(view);
    }
}
