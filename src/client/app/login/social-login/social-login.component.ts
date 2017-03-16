/**
 * social-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component } from '@angular/core';

import { LoginModalService } from '../../core/login-modal/login-modal.service';
import { Logger } from '../../core/logger/logger';

@Component({
    moduleId: module.id,
    selector: 'gn-social-login',
    templateUrl: 'social-login.component.html',
    styleUrls: ['social-login.component.css']
})
export class SocialLoginComponent {
    constructor(private loginModal: LoginModalService, private logger: Logger) {
    }

    onSetModalView(view: string): void {
        this.loginModal.setActiveView(view);
    }

    onClickFacebook(): void {
        this.logger.debug(this, 'Clicked Facebook');
    }
}
