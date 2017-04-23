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

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/pluck';
import * as _ from 'lodash';
import { LanguageCode } from '../../core/typings/language-code';

@Component({
    moduleId: module.id,
    selector: 'gn-general',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.css']
})
export class GeneralComponent implements OnDestroy {
    @ViewChild('passwordForm') passwordForm: NgForm;

    emailRegex = EMAIL_REGEX;
    isEditing$ = new BehaviorSubject<boolean>(false);
    studyLanguageOptions: any;

    emailModel: string = '';
    passwordModel: any = {current: '', replace: '', confirm: ''};

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private http: HttpService, public user: UserService) {
        this.studyLanguageOptions = _.map(Languages, l => {
            return _.mapKeys(l, (v, k) => k === 'code' ? 'value' : 'title');
        });

        this.subscriptions.push(this.isEditing$.filter(b => !b).subscribe(() => this.emailModel = ''));

        this.subscriptions.push(this.user.passwordChange$.subscribe(() => {
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
}
