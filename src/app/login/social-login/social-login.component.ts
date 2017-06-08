/**
 * social-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component } from '@angular/core';

import { LoginModalService } from '../../core/login-modal/login-modal.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'gn-social-login',
    templateUrl: 'social-login.component.html',
    styleUrls: ['social-login.component.scss']
})
export class SocialLoginComponent {
    facebookLoginURL = environment.facebookLoginUrl;
    twitterLoginURL = environment.twitterLoginUrl;
    googleLoginURL = environment.googleLoginUrl;

    constructor(private loginModal: LoginModalService) {
    }

    onSetModalView(view: string): void {
        this.loginModal.setActiveView(view);
    }
}
