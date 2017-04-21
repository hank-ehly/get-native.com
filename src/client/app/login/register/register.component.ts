/**
 * register.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/23.
 */

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { EMAIL_REGEX } from '../../core/typings/email-regex';
import { Logger } from '../../core/logger/logger';
import { LoginModalService } from '../../core/login-modal/login-modal.service';
import { HttpService } from '../../core/http/http.service';
import { APIHandle } from '../../core/http/api-handle';
import { UserService } from '../../core/user/user.service';
import { User } from '../../core/entities/user';

import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'gn-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnDestroy {
    emailRegex = EMAIL_REGEX;

    credentials: any = {
        email: '',
        password: '',
        passwordConfirm: ''
    };

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private loginModal: LoginModalService, private http: HttpService, private router: Router,
                private user: UserService) {
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'ngOnDestroy - Unsubscribe all', this.subscriptions);
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    onSetModalView(view: string) {
        this.loginModal.setActiveView(view);
    }

    onSubmit(): void {
        this.logger.debug(this, 'onSubmit');
        this.subscriptions.push(this.http.request(APIHandle.REGISTER, {body: this.credentials})
            .subscribe(this.onRegistrationResponse.bind(this)));
    }

    private onRegistrationResponse(user: User): void {
        this.user.current$.next(user);
        this.loginModal.hideModal();
        this.router.navigate(['dashboard']).catch(e => {
            this.logger.info(this, 'Failed to navigate to dashboard: ', e);
        });
    }
}
