/**
 * forgot-password.component
 * getnativelearning.com
 *
 * Created by henryehly on 2017/04/24.
 */

import { Component, OnDestroy } from '@angular/core';

import { Logger } from '../../core/logger/logger';
import { EMAIL_REGEX } from '../../core/typings/email-regex';
import { LoginModalService } from '../../core/login-modal/login-modal.service';
import { Subject } from 'rxjs/Subject';
import { HttpService } from '../../core/http/http.service';
import { APIHandle } from '../../core/http/api-handle';
import { APIError, APIErrors } from '../../core/http/api-error';
import * as _ from 'lodash';

@Component({
    selector: 'gn-forgot-password',
    templateUrl: 'forgot-password.component.html',
    styleUrls: ['forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnDestroy {

    email = '';
    submittedEmail = '';
    emailRegex: string = EMAIL_REGEX;
    processing = false;
    error: APIError;

    private OnDestroy$ = new Subject<void>();

    constructor(private logger: Logger, private modal: LoginModalService, private http: HttpService) {
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    onSubmit(): void {
        this.logger.debug(this, 'onSubmit');

        const options = {
            body: {
                email: this.email
            }
        };

        this.error = null;
        this.processing = true;
        this.http.request(APIHandle.SEND_PASSWORD_RESET_LINK, options)
            .takeUntil(this.OnDestroy$)
            .subscribe(
                this.onSendPasswordResetLinkNext.bind(this),
                this.onSendPasswordResetLinkError.bind(this)
            );
    }

    onSetModalView(view: string): void {
        this.modal.setActiveView(view);
    }

    private onSendPasswordResetLinkNext(): void {
        this.processing = false;
        this.submittedEmail = this.email;
    }

    private onSendPasswordResetLinkError(errors: APIErrors): void {
        this.processing = false;
        if (errors.length) {
            this.error = _.first(errors);
        }
    }

}
