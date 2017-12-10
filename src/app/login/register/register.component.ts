/**
 * register.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModalService } from '../login-modal.service';
import { EMAIL_REGEX } from '../../core/typings/email-regex';
import { HttpService } from '../../core/http/http.service';
import { UserService } from '../../core/user/user.service';
import { DOMService } from '../../core/dom/dom.service';
import { APIHandle } from '../../core/http/api-handle';
import { APIErrors } from '../../core/http/api-error';
import { Logger } from '../../core/logger/logger';
import { User } from '../../core/entities/user';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import * as _ from 'lodash';

@Component({
    selector: 'gn-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnDestroy {
    OnDestroy$ = new Subject<void>();
    emailRegex = EMAIL_REGEX;

    model: any = {
        email: '',
        password: '',
        passwordConfirm: ''
    };

    flags = {
        processing: {
            createUser: false
        }
    };

    errors: APIErrors = [];

    constructor(private logger: Logger, private loginModal: LoginModalService, private http: HttpService, private router: Router,
                private user: UserService, private dom: DOMService) {
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    onSetModalView(view: string) {
        this.loginModal.setActiveView(view);
    }

    onSubmit(): void {
        this.logger.debug(this, 'onSubmit');
        const options = {body: this.model};
        this.flags.processing.createUser = true;
        this.http.request(APIHandle.CREATE_USER, options)
            .takeUntil(this.OnDestroy$)
            .subscribe(
                this.onCreateUserNext.bind(this),
                this.onCreateUserError.bind(this)
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

    private onCreateUserNext(user: User): void {
        this.user.update(user);
        this.router.navigate([{outlets: {modal: null}}]).then(() => {
            return this.router.navigate(['/dashboard']);
        }).then(() => {
            this.dom.alert(`Welcome ${this.model.email}! Your account has been successfully created.`);
        }).catch((errors: APIErrors) => {
            this.dom.alert(`An unknown error has occurred. Please try logging in again.`);
        });
    }

    private onCreateUserError(errors: APIErrors): void {
        this.flags.processing.createUser = false;
        this.errors = errors;
    }
}
