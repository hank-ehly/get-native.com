/**
 * social-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component } from '@angular/core';

import { LoginService } from '../login.service';

@Component({
    moduleId: module.id,
    selector: 'gn-social-login',
    templateUrl: 'social-login.component.html',
    styleUrls: ['social-login.component.css']
})

export class SocialLoginComponent {
    constructor(private loginService: LoginService) {
    }

    onSetModalView(view: string) {
        this.loginService.setActiveView(view);
    }
}
