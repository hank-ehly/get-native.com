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

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import * as _ from 'lodash';

@Component({
    selector: 'gn-general',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {
    @ViewChild('passwordForm') passwordForm: NgForm;
    OnDestroy$ = new Subject<void>();
    isPresentingForgotPasswordModal$ = new BehaviorSubject<boolean>(false);

    emailRegex = EMAIL_REGEX;
    isEditing$ = new BehaviorSubject<boolean>(false);
    studyLanguageOptions: any;
    interfaceLanguageOptions: any;

    emailModel = '';
    submittedEmail = '';
    passwordModel: any = {current: '', replace: '', confirm: ''};

    hasClickedResend = false;

    submitEmailEmitted$: Observable<any>;
    private submitEmailSource: Subject<any>;

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
        this.submitEmailEmitted$.takeUntil(this.OnDestroy$).subscribe(this.onSubmitEmailSuccess.bind(this));
        this.isEditing$.takeUntil(this.OnDestroy$).filter(b => !b).subscribe(this.onStopEmailEditing.bind(this));
        this.userService.passwordChange$.takeUntil(this.OnDestroy$).subscribe(this.onPasswordChangeSuccess.bind(this));
        this.userService.interfaceLanguageEmitted$.takeUntil(this.OnDestroy$).subscribe(this.onInterfaceLanguageUpdated.bind(this));
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

        this.http.request(APIHandle.EDIT_EMAIL, options).takeUntil(this.OnDestroy$).subscribe(() => {
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
            this.hasClickedResend = true;
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
        this.isEditing$.next(false);
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
    }

    private onInterfaceLanguageUpdated(code: LanguageCode) {
        window.location.href = window.location.protocol + '//' + [window.location.host, code, 'settings'].join('/');
    }

    private onPasswordChangeSuccess(): void {
        this.logger.debug(this, 'Password change successful');
        this.passwordForm.reset();
    }

    private onSubmitEmailSuccess(): void {
        this.submittedEmail = this.emailModel;
        this.isEditing$.next(false);
    }

    private onStopEmailEditing(): void {
        this.emailModel = '';
    }
}
