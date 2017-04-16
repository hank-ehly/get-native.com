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
import { LocalStorageService } from '../../core/local-storage/local-storage.service';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { kAcceptLocalStorage } from '../../core/local-storage/local-storage-keys';

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

    loginRequest$ = this.http.request(APIHandle.LOGIN, {body: this.credentials});

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private router: Router, private loginModal: LoginModalService, private http: HttpService,
                private user: UserService, private localStorage: LocalStorageService) {
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.forEach(this.subscriptions, s => s.unsubscribe());
    }

    onSetModalView(view: string): void {
        this.loginModal.setActiveView(view);
    }

    onSubmit(): void {
        this.subscriptions.push(
            this.loginRequest$.subscribe(this.onLoginResponse.bind(this))
        );
    }

    onLoginResponse(user: User): void {
        this.router.navigate(['dashboard']).then(() => {
            this.loginModal.hideModal();
            this.user.current$.next(user);
            this.localStorage.setItem(kAcceptLocalStorage, true);
        }).catch(error => {
            this.logger.warn(this, error);
        });
    }
}
