/**
 * social-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component } from '@angular/core';

import { LoginModalService } from '../../core/login-modal/login-modal.service';
import { Config } from '../../shared/config/env.config';

@Component({
    selector: 'gn-social-login',
    templateUrl: 'social-login.component.html',
    styleUrls: ['social-login.component.scss']
})
export class SocialLoginComponent {
    facebookLoginURL = Config.FacebookLoginUrl;
    twitterLoginURL = Config.TwitterLoginUrl;
    googleLoginURL = Config.GoogleLoginUrl;

    constructor(private loginModal: LoginModalService) {
    }

    onSetModalView(view: string): void {
        this.loginModal.setActiveView(view);
    }
}
