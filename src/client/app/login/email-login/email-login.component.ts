/**
 * email-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService, Logger } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-email-login',
    templateUrl: 'email-login.component.html',
    styleUrls: ['email-login.component.css']
})
export class EmailLoginComponent {
    /* Taken from HTML5 Specification */
    HTML5_EMAIL_REGEX: string = '[a-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*';

    credentials: any = {
        email: '',
        password: ''
    };

    formErrors: string[] = [];

    constructor(private logger: Logger, private router: Router, private loginService: LoginService) {
    }

    onSetModalView(view: string): void {
        this.loginService.setActiveView(view);
    }

    // TODO: API
    // TODO: Success -> Go to dashboard
    // TODO: Failure -> Display form error
    onSubmit(): void {
        this.logger.debug('[EmailLoginComponent]: onSubmit()');
        this.router.navigate(['dashboard']).then((success) => {
            if (success) {
                this.logger.debug('Navigation success');
                this.loginService.hideModal();
            } else {
                this.logger.warn('Navigation failed');
            }
        }).catch((reason) => {
            this.logger.warn(reason);
        });
    }
}
