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
import { takeUntil } from 'rxjs/operator/takeUntil';
import { SelectComponent } from '../../shared/select/select.component';

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
    updateDefaultStudyLanguageError: APIError;
    updateInterfaceLanguageError: APIError;

    flags = {
        hasResentConfirmationEmail: false,
        hasSentPasswordResetLink: false,
        processing: {
            resendConfirmationEmail: false,
            sendPasswordResetLink: false,
            editEmail: false,
            selectDefaultStudyLanguage: false,
            selectInterfaceLanguage: false,
            updatePassword: false
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
            replace: {
                id: this.user.id
            },
            body: {
                email: this.emailModel
            }
        };

        this.flags.processing.editEmail = true;
        this.http.request(APIHandle.EDIT_EMAIL, options)
            .takeUntil(this.OnDestroy$)
            .subscribe(
                this.onEditEmailNext.bind(this),
                this.onEditEmailError.bind(this)
            );
    }

    private onEditEmailNext(): void {
        this.flags.processing.editEmail = false;
        this.sentEmailUpdateConfirmationEmailSource.next(true);
    }

    private onEditEmailError(errors?: APIErrors): void {
        this.flags.processing.editEmail = false;
        if (errors && errors.length) {
            this.editEmailError = _.first(errors);
        }
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
            this.resendConfirmationEmailError = {code: '500', message: 'Error 55283 -- Please contact the admin if problem persists.'};
        }
    }

    onSelectDefaultStudyLanguage(code: LanguageCode) {
        this.flags.processing.selectDefaultStudyLanguage = true;
        this.http.request(APIHandle.UPDATE_USER, {body: {default_study_language_code: code}})
            .takeUntil(this.OnDestroy$)
            .subscribe(
                this.onSelectDefaultStudyLanguageNext.bind(this, code),
                this.onSelectDefaultStudyLanguageError.bind(this)
            );
    }

    private onSelectDefaultStudyLanguageNext(code: LanguageCode): void {
        this.updateDefaultStudyLanguageError = null;
        this.flags.processing.selectDefaultStudyLanguage = false;
        this.userService.update({
            default_study_language: this.lang.languageForCode(code)
        });
    }

    private onSelectDefaultStudyLanguageError(errors: APIErrors): void {
        this.flags.processing.selectDefaultStudyLanguage = false;
        if (errors && errors.length) {
            this.updateDefaultStudyLanguageError = _.first(errors);
        }
    }

    onSelectInterfaceLanguage(code: LanguageCode) {
        this.flags.processing.selectInterfaceLanguage = true;
        this.http.request(APIHandle.UPDATE_USER, {body: {interface_language_code: code}})
            .takeUntil(this.OnDestroy$)
            .subscribe(
                this.onSelectInterfaceLanguageNext.bind(this, code),
                this.onSelectInterfaceLanguageError.bind(this)
            );
    }

    private onSelectInterfaceLanguageNext(code: LanguageCode): void {
        this.updateInterfaceLanguageError = null;
        this.flags.processing.selectInterfaceLanguage = false;
        this.userService.update({interface_language: this.lang.languageForCode(code)});
    }

    private onSelectInterfaceLanguageError(errors: APIErrors): void {
        this.flags.processing.selectInterfaceLanguage = false;
        if (errors && errors.length) {
            this.updateInterfaceLanguageError = _.first(errors);
        }
    }

    onSubmitPassword(): void {
        const options: GNRequestOptions = {
            body: {
                current_password: this.passwordModel.current,
                new_password: this.passwordModel.replace
            }
        };

        this.flags.processing.updatePassword = true;
        this.http.request(APIHandle.EDIT_PASSWORD, options)
            .takeUntil(this.OnDestroy$)
            .subscribe(
                this.onPasswordChangeSuccess.bind(this),
                this.onPasswordChangeError.bind(this)
            );
    }

    private onPasswordChangeSuccess(): void {
        this.flags.processing.updatePassword = false;
        this.passwordFormError = null;
        this.passwordForm.reset();
    }

    private onPasswordChangeError(errors: APIErrors): void {
        this.flags.processing.updatePassword = false;
        if (errors && errors.length) {
            this.passwordFormError = _.first(errors);
        }
    }

    onClickCancelEmailEditing(): void {
        this.editEmailError = null;
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
            .subscribe(
                this.onSendPasswordResetLinkNext.bind(this),
                this.onSendPasswordResetLinkError.bind(this)
            );
    }

    private onSendPasswordResetLinkError(errors?: APIErrors): void {
        this.flags.processing.sendPasswordResetLink = false;
        if (errors && errors.length) {
            this.passwordResetLinkError = _.first(errors);
        }
    }

    onClickEditEmailAddress(): void {
        this.isEditingEmailAddress$.next(true);
    }

    private onSubmitEmailSuccess(): void {
        this.submittedEmailAddress = this.emailModel;
        this.isEditingEmailAddress$.next(false);
    }

    private onStopEmailEditing(): void {
        this.emailModel = '';
    }

    private onSendPasswordResetLinkNext(): void {
        this.flags.processing.sendPasswordResetLink = false;
        this.flags.hasSentPasswordResetLink = true;
    }

    private onHideForgotPasswordModal(): void {
        this.passwordResetLinkError = null;
    }

}
