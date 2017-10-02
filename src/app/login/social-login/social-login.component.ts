/**
 * social-login.component
 * getnativelearning.com
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

    e = environment;

    providers = {
        FACEBOOK: 0,
        TWITTER: 1,
        GOOGLE: 2
    };

    flags = {
        processing: {
            navigation: false
        }
    };

    constructor(private loginModal: LoginModalService) {
    }

    onSetModalView(view: string): void {
        this.loginModal.setActiveView(view);
    }

    onClickSocialButton(provider: number): void {
        this.flags.processing.navigation = true;
        window.location.href = this.OAuthURLForProvider(provider);
    }

    private OAuthURLForProvider(provider: number): string {
        switch (provider) {
            case this.providers.FACEBOOK:
                return this.e.facebookLoginUrl;
            case this.providers.TWITTER:
                return this.e.twitterLoginUrl;
            case this.providers.GOOGLE:
                return this.e.googleLoginUrl;
            default:
                throw new Error(`provider ${provider} is not a valid provider.`);
        }
    }

}
