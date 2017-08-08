/**
 * register.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModalService } from '../../core/login-modal/login-modal.service';
import { EMAIL_REGEX } from '../../core/typings/email-regex';
import { HttpService } from '../../core/http/http.service';
import { UserService } from '../../core/user/user.service';
import { APIHandle } from '../../core/http/api-handle';
import { APIErrors } from '../../core/http/api-error';
import { Logger } from '../../core/logger/logger';
import { User } from '../../core/entities/user';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
    selector: 'gn-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnDestroy {
    emailRegex = EMAIL_REGEX;

    credentials: any = {
        email: '',
        password: '',
        passwordConfirm: ''
    };

    errors: APIErrors = [];

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private loginModal: LoginModalService, private http: HttpService, private router: Router,
                private user: UserService) {
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    onSetModalView(view: string) {
        this.loginModal.setActiveView(view);
    }

    onSubmit(): void {
        this.logger.debug(this, 'onSubmit');
        this.subscriptions.push(
            this.http.request(APIHandle.CREATE_USER, {body: this.credentials}).subscribe(
                this.onRegistrationResponse.bind(this),
                this.onRegistrationError.bind(this)
            )
        );
    }

    goToPrivacy(): void {
        this.router.navigate([{outlets: {modal: null}}]).then(() => {
            this.router.navigate(['/privacy']);
        });
    }

    goToTOS(): void {
        this.router.navigate([{outlets: {modal: null}}]).then(() => {
            this.router.navigate(['/tos']);
        });
    }

    private onRegistrationResponse(user: User): void {
        this.user.updateCache(user);
        this.router.navigate(['dashboard']).catch(e => {
            this.logger.info(this, 'Navigation to Dashboard failed', e);
        });
    }

    private onRegistrationError(errors: APIErrors): void {
        this.errors = errors;
    }
}
