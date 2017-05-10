/**
 * email-login.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from '../../core/logger/logger';
import { LoginModalService } from '../../core/login-modal/login-modal.service';
import { HttpService } from '../../core/http/http.service';
import { EMAIL_REGEX } from '../../core/typings/email-regex';
import { APIHandle } from '../../core/http/api-handle';
import { UserService } from '../../core/user/user.service';
import { User } from '../../core/entities/user';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { APIErrors } from '../../core/http/api-error';

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

    errors: APIErrors = [];

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private router: Router, private loginModal: LoginModalService, private http: HttpService,
                private user: UserService) {
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onSetModalView(view: string): void {
        this.loginModal.setActiveView(view);
    }

    onSubmit(): void {
        this.subscriptions.push(
            this.http.request(APIHandle.CREATE_SESSION, {body: this.credentials}).subscribe(
                this.onLoginResponse.bind(this),
                this.onLoginError.bind(this)
            )
        );
    }

    private onLoginResponse(user: User): void {
        this.user.updateCache(user);
        this.loginModal.hideModal();
        this.router.navigate(['dashboard']).catch(e => {
            this.logger.warn(this, e);
        });
    }

    private onLoginError(errors: APIErrors): void {
        this.logger.debug(this, errors);
        this.errors = errors;
    }
}
