/**
 * general.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EMAIL_REGEX } from '../../core/typings/email-regex';
import { Logger } from '../../core/logger/logger';
import { HttpService } from '../../core/http/http.service';
import { UserService } from '../../core/user/user.service';
import { Languages } from '../../core/lang/languages';
import { APIHandle } from '../../core/http/api-handle';
import { User } from '../../core/entities/user';
import { LanguageCode } from '../../core/typings/language-code';
import { LangService } from '../../core/lang/lang.service';
import { APIError, APIErrors } from '../../core/http/api-error';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

@Component({
    selector: 'gn-general',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {
    @ViewChild('passwordForm') passwordForm: NgForm;
    OnDestroy$ = new Subject<void>();

    emailRegex = EMAIL_REGEX;
    isEditingEmailAddress$ = new BehaviorSubject<boolean>(false);
    emailModel = '';
    submittedEmailAddress = '';
    submitEmailEmitted$: Observable<any>;
    private submitEmailSource: Subject<any>;
    hasClickedResendConfirmationEmail = false;

    studyLanguageOptions: any;
    interfaceLanguageOptions: any;

    isPresentingForgotPasswordModal$ = new BehaviorSubject<boolean>(false);
    passwordResetLinkError: APIError;
    passwordModel: any = {current: '', replace: '', confirm: ''};
    passwordFormError: APIError;
    hasSentPasswordResetLink = false;

    processing = {
        sendPasswordResetLink: false
    };

    user: User = this.userService.current$.getValue();

    constructor(private logger: Logger, private http: HttpService, private userService: UserService, private lang: LangService) {
        this.submitEmailSource = new Subject();
        this.submitEmailEmitted$ = this.submitEmailSource.asObservable();

        this.studyLanguageOptions = this.interfaceLanguageOptions = _.map(Languages, l => {
            return _.mapKeys(<any>l, (v, k) => k.toString() === 'code' ? 'value' : 'title');
        });
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        this.submitEmailEmitted$
            .takeUntil(this.OnDestroy$)
            .subscribe(this.onSubmitEmailSuccess.bind(this));

        this.isEditingEmailAddress$
            .takeUntil(this.OnDestroy$)
            .filter(b => !b)
            .subscribe(this.onStopEmailEditing.bind(this));

        this.userService.passwordChange$
            .takeUntil(this.OnDestroy$)
            .subscribe(this.onPasswordChangeSuccess.bind(this), this.onPasswordChangeError.bind(this));

        this.userService.interfaceLanguageEmitted$
            .takeUntil(this.OnDestroy$)
            .subscribe(this.onInterfaceLanguageUpdated.bind(this));

        this.isPresentingForgotPasswordModal$
            .takeUntil(this.OnDestroy$)
            .filter(b => !b)
            .subscribe(this.onHideForgotPasswordModal.bind(this));
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    onSubmitEmail(): void {
        this.logger.debug(this, 'onSubmitEmail');

        const options = {
            params: {
                id: this.user.id
            },
            body: {
                email: this.emailModel
            }
        };

        this.http.request(APIHandle.EDIT_EMAIL, options)
            .takeUntil(this.OnDestroy$)
            .subscribe(() => {
                this.submitEmailSource.next(true);
            });
    }

    onClickResend(): void {
        this.logger.debug(this, 'Resend Confirmation Email');

        const options = {
            body: {
                email: this.user.email
            }
        };

        this.http.request(APIHandle.RESEND_CONFIRMATION_EMAIL, options).takeUntil(this.OnDestroy$).subscribe(() => {
            this.hasClickedResendConfirmationEmail = true;
        });
    }

    onSelectDefaultStudyLanguage(code: LanguageCode) {
        this.userService.update({default_study_language: this.lang.languageForCode(code)});
    }

    onSelectInterfaceLanguage(code: LanguageCode) {
        this.userService.update({interface_language: this.lang.languageForCode(code)});
    }

    onSubmitPassword(): void {
        this.userService.updatePassword(this.passwordModel.current, this.passwordModel.replace);
    }

    onClickCancelEmailEditing(): void {
        this.isEditingEmailAddress$.next(false);
    }

    onClickForgotPassword(): void {
        this.logger.debug(this, 'onClickForgotPassword');
        this.isPresentingForgotPasswordModal$.next(true);
    }

    onClickCloseForgotPasswordModal(): void {
        this.isPresentingForgotPasswordModal$.next(false);
    }

    onClickSendPasswordResetLink(): void {
        this.logger.debug(this, 'onClickSendPasswordResetLink');

        const options = {
            body: {
                email: this.user.email
            }
        };

        this.processing.sendPasswordResetLink = true;
        this.http.request(APIHandle.SEND_PASSWORD_RESET_LINK, options)
            .takeUntil(this.OnDestroy$)
            .map(this.onSendPasswordResetLinkNext.bind(this))
            .subscribe(null, this.onSendPasswordResetLinkError.bind(this));
    }

    private onInterfaceLanguageUpdated(code: LanguageCode) {
        window.location.href = window.location.protocol + '//' + [window.location.host, code, 'settings'].join('/');
    }

    private onPasswordChangeSuccess(): void {
        this.passwordForm.reset();
    }

    private onPasswordChangeError(errors: APIErrors): void {
        if (errors.length) {
            this.passwordFormError = _.first(errors);
        }
    }

    private onSubmitEmailSuccess(): void {
        this.submittedEmailAddress = this.emailModel;
        this.isEditingEmailAddress$.next(false);
    }

    private onStopEmailEditing(): void {
        this.emailModel = '';
    }

    private onSendPasswordResetLinkNext(): void {
        this.processing.sendPasswordResetLink = false;
        this.hasSentPasswordResetLink = true;
    }

    private onSendPasswordResetLinkError(errors: APIErrors): void {
        this.processing.sendPasswordResetLink = false;
        if (errors.length) {
            this.passwordResetLinkError = _.first(errors);
        }
    }

    private onHideForgotPasswordModal(): void {
        this.passwordResetLinkError = null;
    }
}
