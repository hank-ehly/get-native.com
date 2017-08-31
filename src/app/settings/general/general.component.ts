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
import { GNRequestOptions } from '../../core/http/gn-request-options';

@Component({
    selector: 'gn-general',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {

    @ViewChild('passwordForm') passwordForm: NgForm;

    emailRegex = EMAIL_REGEX;

    emailModel = '';
    submittedEmailAddress = '';
    passwordModel: any = {current: '', replace: '', confirm: ''};

    sentEmailUpdateConfirmationEmailEmitted$: Observable<any>;
    isEditingEmailAddress$ = new BehaviorSubject<boolean>(false);
    isPresentingForgotPasswordModal$ = new BehaviorSubject<boolean>(false);

    studyLanguageOptions: any;
    interfaceLanguageOptions: any;

    resendConfirmationEmailError: APIError;
    editEmailError: APIError;
    passwordResetLinkError: APIError;
    passwordFormError: APIError;

    flags = {
        hasResentConfirmationEmail: false,
        hasSentPasswordResetLink: false,
        processing: {
            resendConfirmationEmail: false,
            sendPasswordResetLink: false
        }
    };

    user: User = this.userService.current$.getValue();

    private sentEmailUpdateConfirmationEmailSource: Subject<any>;
    private OnDestroy$ = new Subject<void>();

    constructor(private logger: Logger, private http: HttpService, private userService: UserService, private lang: LangService) {
        this.sentEmailUpdateConfirmationEmailSource = new Subject();
        this.sentEmailUpdateConfirmationEmailEmitted$ = this.sentEmailUpdateConfirmationEmailSource.asObservable();

        this.studyLanguageOptions = this.interfaceLanguageOptions = _.map(Languages, l => {
            return _.mapKeys(<any>l, (v, k) => k.toString() === 'code' ? 'value' : 'title');
        });
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        this.sentEmailUpdateConfirmationEmailEmitted$
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

        const options: GNRequestOptions = {
            params: {
                id: this.user.id
            },
            body: {
                email: this.emailModel
            }
        };

        this.http.request(APIHandle.EDIT_EMAIL, options)
            .takeUntil(this.OnDestroy$)
            .subscribe(
                this.onEditEmailNext.bind(this),
                this.onEditEmailError.bind(this)
            );
    }

    onClickResendConfirmationEmail(): void {
        this.logger.debug(this, 'Resend Confirmation Email');

        const options = {
            body: {
                email: this.user.email
            }
        };

        this.flags.processing.resendConfirmationEmail = true;
        this.http.request(APIHandle.RESEND_CONFIRMATION_EMAIL, options)
            .takeUntil(this.OnDestroy$)
            .subscribe(
                this.onResendConfirmationEmailNext.bind(this),
                this.onResendConfirmationEmailError.bind(this)
            );
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

        this.flags.processing.sendPasswordResetLink = true;
        this.http.request(APIHandle.SEND_PASSWORD_RESET_LINK, options)
            .takeUntil(this.OnDestroy$)
            .map(this.onSendPasswordResetLinkNext.bind(this))
            .subscribe(null, this.onSendPasswordResetLinkError.bind(this));
    }

    onClickEditEmailAddress(): void {
        this.isEditingEmailAddress$.next(true);
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

    private onEditEmailNext(): void {
        this.sentEmailUpdateConfirmationEmailSource.next(true);
    }

    private onEditEmailError(errors?: APIErrors): void {
        if (errors && errors.length) {
            this.editEmailError = _.first(errors);
        }
    }

    private onSendPasswordResetLinkNext(): void {
        this.flags.processing.sendPasswordResetLink = false;
        this.flags.hasSentPasswordResetLink = true;
    }

    private onSendPasswordResetLinkError(errors?: APIErrors): void {
        this.flags.processing.sendPasswordResetLink = false;
        if (errors && errors.length) {
            this.passwordResetLinkError = _.first(errors);
        }
    }

    private onHideForgotPasswordModal(): void {
        this.passwordResetLinkError = null;
    }

    private onResendConfirmationEmailNext(): void {
        this.flags.hasResentConfirmationEmail = true;
        this.flags.processing.resendConfirmationEmail = false;
        this.resendConfirmationEmailError = null;
    }

    private onResendConfirmationEmailError(errors?: APIErrors): void {
        this.flags.processing.resendConfirmationEmail = false;
        if (errors && errors.length) {
            this.resendConfirmationEmailError = _.first(errors);
        } else {
            // todo: default i18n
            this.resendConfirmationEmailError = {code: '500', message: 'HTTP (500)'};
        }
    }

}
