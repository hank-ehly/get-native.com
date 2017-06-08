/**
 * general.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, ViewChild, OnDestroy } from '@angular/core';
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
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pluck';
import * as _ from 'lodash';

@Component({
    selector: 'gn-general',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.scss']
})
export class GeneralComponent implements OnDestroy {
    @ViewChild('passwordForm') passwordForm: NgForm;

    emailRegex = EMAIL_REGEX;
    isEditing$ = new BehaviorSubject<boolean>(false);
    studyLanguageOptions: any;
    interfaceLanguageOptions: any;

    emailModel = '';
    passwordModel: any = {current: '', replace: '', confirm: ''};

    user: User = this.userService.current$.getValue();

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private http: HttpService, private userService: UserService, private lang: LangService) {
        this.studyLanguageOptions = this.interfaceLanguageOptions = _.map(Languages, l => {
            return _.mapKeys(<any>l, (v, k) => k.toString() === 'code' ? 'value' : 'title');
        });

        this.subscriptions.push(this.isEditing$.filter(b => !b).subscribe(() => this.emailModel = ''));

        this.subscriptions.push(this.userService.passwordChange$.subscribe(() => {
            this.passwordForm.reset();
        }));
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onSubmitEmail(): void {
        this.logger.debug(this, 'onSubmitEmail');
        this.subscriptions.push(this.http.request(APIHandle.EDIT_EMAIL, {body: {email: this.emailModel}}).subscribe());
    }

    onClickResend(): void {
        this.logger.debug(this, 'Resend Confirmation Email');
        this.subscriptions.push(this.http.request(APIHandle.RESEND_CONFIRMATION_EMAIL, {body: {email: this.user.email}}).subscribe());
    }

    updateDefaultStudyLanguage(code: LanguageCode) {
        this.userService.update({default_study_language: this.lang.languageForCode(code)});
    }

    updateInterfaceLanguage(code: LanguageCode) {
        this.userService.update({interface_language: this.lang.languageForCode(code)});
    }

    onSubmitPassword(): void {
        this.userService.updatePassword(this.passwordModel.current, this.passwordModel.replace);
    }
}
