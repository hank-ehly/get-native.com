/**
 * email-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Logger, LoginModalService, APIHandle, HttpService } from '../../core/index';
import { Config } from '../../shared/config/env.config';

@Component({
    moduleId: module.id,
    selector: 'gn-email-login',
    templateUrl: 'email-login.component.html',
    styleUrls: ['email-login.component.css']
})
export class EmailLoginComponent {
    emailRegex = Config.EMAIL_REGEX;

    credentials: any = {
        email: '',
        password: ''
    };

    constructor(private logger: Logger, private router: Router, private loginModal: LoginModalService, private http: HttpService) {
    }

    onSetModalView(view: string): void {
        this.loginModal.setActiveView(view);
    }

    onSubmit(): void {
        this.http.request(APIHandle.LOGIN, {body: this.credentials}).subscribe(this.onLoginSuccess.bind(this));
    }

    onLoginSuccess(): void {
        this.router.navigate(['dashboard']).then((success) => {
            if (success) {
                this.logger.debug('Navigation success');
                this.loginModal.hideModal();
            } else {
                this.logger.warn('Navigation failed');
            }
        }).catch((reason) => {
            this.logger.warn(reason);
        });
    }
}
