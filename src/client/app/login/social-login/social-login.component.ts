/**
 * social-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../core/login/login.service';

@Component({
    moduleId: module.id,
    selector: 'gn-social-login',
    templateUrl: 'social-login.component.html',
    styleUrls: ['social-login.component.css']
})
export class SocialLoginComponent {
    constructor(private loginService: LoginService, private router: Router) {
    }

    onSetModalView(view: string): void {
        this.loginService.setActiveView(view);
    }

    onLogin(): void {
        this.loginService.hideModal();
        this.router.navigate(['dashboard']);
    }
}
