/**
 * general.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, ViewChild, OnInit } from '@angular/core';

import { Logger, HttpService, APIHandle, EMAIL_REGEX, ObjectService, Languages, LangCode, User, AuthService } from '../../core/index';
import { FocusDirective } from '../../shared/focus/focus.directive';

@Component({
    moduleId: module.id,
    selector: 'gn-general',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.css']
})
export class GeneralComponent implements OnInit {
    @ViewChild(FocusDirective) emailInput: FocusDirective;
    emailRegex = EMAIL_REGEX;
    isEditing: boolean = false;
    studyLanguageOptions: any;
    user: User;

    credentials: any = {
        email: '',
        password: {current: '', replace: '', confirm: ''}
    };

    constructor(private logger: Logger, private http: HttpService, private objectService: ObjectService, private auth: AuthService) {
        this.studyLanguageOptions = objectService.renameProperty(Languages, [['code', 'value'], ['name', 'title']]);
    }

    ngOnInit(): void {
        this.logger.debug(this, 'ngOnInit()');

        // Use async pipe if you don't need to handle this data directly
        this.auth.getCurrentUser().then((user: User) => this.user = user);
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
        this.http.request(APIHandle.EDIT_EMAIL, {body: {email: this.credentials.email}}).subscribe();
    }

    onSelectDefaultStudyLanguage(code: LangCode): void {
        this.logger.debug(this, `Selected new default study language: ${code}`);
        this.http.request(APIHandle.EDIT_ACCOUNT, {body: {default_study_language: code}}).subscribe();
    }

    onSubmitPassword(): void {
        this.logger.debug(this, 'onSubmitPassword()');
        this.http.request(APIHandle.EDIT_PASSWORD, {body: {password: this.credentials.password.replace}}).subscribe();
    }
}
