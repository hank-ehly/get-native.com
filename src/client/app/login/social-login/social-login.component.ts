/**
 * social-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModalService } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-social-login',
    templateUrl: 'social-login.component.html',
    styleUrls: ['social-login.component.css']
})
export class SocialLoginComponent {
    constructor(private loginModal: LoginModalService, private router: Router) {
    }

    onSetModalView(view: string): void {
        this.loginModal.setActiveView(view);
    }

    onLogin(): void {
        this.loginModal.hideModal();
        this.router.navigate(['dashboard']);
    }
}
