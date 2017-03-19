/**
 * general.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { FocusDirective } from '../../shared/focus/focus.directive';
import { EMAIL_REGEX } from '../../core/typings/email-regex';
import { User } from '../../core/entities/user';
import { Logger } from '../../core/logger/logger';
import { HttpService } from '../../core/http/http.service';
import { ObjectService } from '../../core/object/object.service';
import { UserService } from '../../core/user/user.service';
import { Languages } from '../../core/lang/languages';
import { APIHandle } from '../../core/http/api-handle';
import { LanguageCode } from '../../core/typings/language-code';

import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'gn-general',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.css']
})
export class GeneralComponent implements OnInit, OnDestroy {
    @ViewChild(FocusDirective) emailInput: FocusDirective;
    emailRegex = EMAIL_REGEX;
    isEditing: boolean = false;
    studyLanguageOptions: any;
    user: User;

    credentials: any = {
        email: '',
        password: {current: '', replace: '', confirm: ''}
    };

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private http: HttpService, private objectService: ObjectService, private userService: UserService) {
        this.studyLanguageOptions = objectService.renameProperty(Languages, [['code', 'value'], ['name', 'title']]);
    }

    ngOnInit(): void {
        this.userService.current.then(u => this.user = u);
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'ngOnDestroy - Unsubscribe all', this.subscriptions);
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    onClickEdit(): void {
        this.isEditing = true;
        this.emailInput.focus();
    }

    onClickCancel(): void {
        this.isEditing = false;
        this.credentials.email = '';
    }

    onSubmitEmail(): void {
        this.logger.debug(this, 'onSubmitEmail()');
        this.subscriptions.push(
            this.http.request(APIHandle.EDIT_EMAIL, {body: {email: this.credentials.email}}).subscribe()
        );
    }

    onSelectDefaultStudyLanguage(code: LanguageCode): void {
        this.logger.debug(this, `Selected new default study language: ${code}`);
        this.subscriptions.push(
            this.http.request(APIHandle.EDIT_ACCOUNT, {body: {default_study_language: code}}).subscribe()
        );
    }

    onSubmitPassword(): void {
        this.logger.debug(this, 'onSubmitPassword()');
        this.subscriptions.push(
            this.http.request(APIHandle.EDIT_PASSWORD, {body: {password: this.credentials.password.replace}}).subscribe()
        );
    }
}
