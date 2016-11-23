/**
 * social-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-social-login',
    templateUrl: 'social-login.component.html',
    styleUrls: ['social-login.component.css']
})

export class SocialLoginComponent {
    @Output() setModalView = new EventEmitter<string>();

    onSetModalView(view: string) {
        this.setModalView.emit(view);
    }
}
