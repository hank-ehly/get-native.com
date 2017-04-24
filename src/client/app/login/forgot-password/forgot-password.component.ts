/**
 * forgot-password.component
 * get-native.com
 *
 * Created by henryehly on 2017/04/24.
 */

import { Component } from '@angular/core';

import { Logger } from '../../core/logger/logger';
import { EMAIL_REGEX } from '../../core/typings/email-regex';
import { LoginModalService } from '../../core/login-modal/login-modal.service';

@Component({
    moduleId: module.id,
    selector: 'gn-forgot-password',
    templateUrl: 'forgot-password.component.html',
    styleUrls: ['forgot-password.component.css']
})
export class ForgotPasswordComponent {
    email: string = '';
    emailRe: string = EMAIL_REGEX;

    constructor(private logger: Logger, private modal: LoginModalService) {
    }

    onSubmit(): void {
        this.logger.debug(this, 'onSubmit');
    }

    onSetModalView(view: string): void {
        this.modal.setActiveView(view);
    }
}
