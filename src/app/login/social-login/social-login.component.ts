/**
 * social-login.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, Inject, PLATFORM_ID } from '@angular/core';

import { environment } from '../../../environments/environment';
import { LoginModalService } from '../login-modal.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'gn-social-login',
    templateUrl: 'social-login.component.html',
    styleUrls: ['social-login.component.scss']
})
export class SocialLoginComponent {

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

    constructor(private loginModal: LoginModalService, @Inject(PLATFORM_ID) private platformId: Object) {
    }

    onSetModalView(view: string): void {
        this.loginModal.setActiveView(view);
    }

    onClickSocialButton(provider: number): void {
        this.flags.processing.navigation = true;

        if (isPlatformBrowser(this.platformId)) {
            window.location.href = this.OAuthURLForProvider(provider);
        }
    }

    private OAuthURLForProvider(provider: number): string {
        switch (provider) {
            case this.providers.FACEBOOK:
                return environment.facebookLoginUrl;
            case this.providers.TWITTER:
                return environment.twitterLoginUrl;
            case this.providers.GOOGLE:
                return environment.googleLoginUrl;
            default:
                throw new Error(`provider ${provider} is not a valid provider.`);
        }
    }

}
