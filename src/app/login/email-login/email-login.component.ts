/**
 * email-login.component
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

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'gn-email-login',
    templateUrl: 'email-login.component.html',
    styleUrls: ['email-login.component.scss']
})
export class EmailLoginComponent implements OnDestroy {

    OnDestroy$ = new Subject<void>();
    emailRegex = EMAIL_REGEX;

    model: any = {
        email: '',
        password: ''
    };

    flags = {
        processing: {
            login: false
        }
    };

    errors: APIErrors = [];

    constructor(private logger: Logger, private router: Router, private loginModal: LoginModalService, private http: HttpService,
                private user: UserService) {
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    onSetModalView(view: string): void {
        this.loginModal.setActiveView(view);
    }

    onSubmit(): void {
        this.flags.processing.login = true;
        const options = {body: this.model};
        this.http.request(APIHandle.CREATE_SESSION, options)
            .takeUntil(this.OnDestroy$)
            .subscribe(
                this.onCreateSessionNext.bind(this),
                this.onCreateSessionError.bind(this)
            );
    }

    private onCreateSessionNext(user: User): void {
        this.user.updateCache(user);
        this.router.navigate([{outlets: {modal: null}}]).then(() => {
            return this.router.navigate(['dashboard']);
        }).catch(e => {
            this.logger.warn(this, e);
        });
    }

    private onCreateSessionError(errors: APIErrors): void {
        this.flags.processing.login = false;
        this.errors = errors;
    }
}
