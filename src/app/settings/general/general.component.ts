/**
 * general.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, ViewChild, OnDestroy, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pluck';
import * as _ from 'lodash';
import { Language } from '../../core/typings/language';

@Component({
    selector: 'gn-general',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {
    @ViewChild('passwordForm') passwordForm: NgForm;

    emailRegex = EMAIL_REGEX;
    isEditing$ = new BehaviorSubject<boolean>(false);
    studyLanguageOptions: any;
    interfaceLanguageOptions: any;

    emailModel = '';
    passwordModel: any = {current: '', replace: '', confirm: ''};

    submitEmailEmitted$: Observable<any>;
    private emitSubmitEmail$: Subject<any>;

    user: User = this.userService.current$.getValue();

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private http: HttpService, private userService: UserService, private lang: LangService,
                private route: ActivatedRoute, @Inject(LOCALE_ID) private localeId: string) {
        this.emitSubmitEmail$ = new Subject();
        this.submitEmailEmitted$ = this.emitSubmitEmail$.asObservable().do(() => {
            this.isEditing$.next(false);
        });

        this.studyLanguageOptions = this.interfaceLanguageOptions = _.map(Languages, l => {
            return _.mapKeys(<any>l, (v, k) => k.toString() === 'code' ? 'value' : 'title');
        });

        this.subscriptions.push(
            this.isEditing$.filter(b => !b).subscribe(() => this.emailModel = ''),
            this.userService.passwordChange$.subscribe(() => this.passwordForm.reset()),
            this.userService.interfaceLanguageEmitted$.subscribe(this.onInterfaceLanguageUpdated.bind(this))
        );
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.invokeMap(this.subscriptions, 'unsubscribe');
    }

    onSubmitEmail(): void {
        this.logger.debug(this, 'onSubmitEmail');
        const currentUserId = this.userService.current$.getValue().id;
        this.subscriptions.push(
            this.http.request(APIHandle.EDIT_EMAIL, {params: {id: currentUserId}, body: {email: this.emailModel}}).subscribe(() => {
                this.emitSubmitEmail$.next(true);
            })
        );
    }

    onClickResend(): void {
        this.logger.debug(this, 'Resend Confirmation Email');
        const options = {
            body: {
                email: this.user.email
            }
        };
        this.subscriptions.push(
            this.http.request(APIHandle.RESEND_CONFIRMATION_EMAIL, options).subscribe()
        );
    }

    updateDefaultStudyLanguage(code: LanguageCode) {
        this.userService.update({default_study_language: this.lang.languageForCode(code)});
    }

    updateInterfaceLanguage(code: LanguageCode) {
        this.userService.update({interface_language: this.lang.languageForCode(code)});
    }

    onInterfaceLanguageUpdated(code: LanguageCode) {
        window.location.href = window.location.protocol + '//' + [window.location.host, code, 'settings'].join('/');
    }

    onSubmitPassword(): void {
        this.userService.updatePassword(this.passwordModel.current, this.passwordModel.replace);
    }
}
