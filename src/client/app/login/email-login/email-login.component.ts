/**
 * email-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Logger, LoginModalService, APIHandle, HttpService, EMAIL_REGEX } from '../../core/index';

import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'gn-email-login',
    templateUrl: 'email-login.component.html',
    styleUrls: ['email-login.component.css']
})
export class EmailLoginComponent implements OnDestroy {
    emailRegex = EMAIL_REGEX;

    credentials: any = {
        email: '',
        password: ''
    };

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private router: Router, private loginModal: LoginModalService, private http: HttpService) {
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'ngOnDestroy - Unsubscribe all', this.subscriptions);
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    onSetModalView(view: string): void {
        this.loginModal.setActiveView(view);
    }

    onSubmit(): void {
        this.subscriptions.push(
            this.http.request(APIHandle.LOGIN, {body: this.credentials}).subscribe(this.onLoginSuccess.bind(this))
        );
    }

    onLoginSuccess(): void {
        this.router.navigate(['dashboard']).then((success) => {
            if (success) {
                this.logger.debug(this, 'Navigation success');
                this.loginModal.hideModal();
            } else {
                this.logger.debug(this, 'Navigation failed');
            }
        }).catch((reason) => {
            this.logger.debug(this, reason);
        });
    }
}
