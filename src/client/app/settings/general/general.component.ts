/**
 * general.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, ViewChild, OnDestroy } from '@angular/core';

import { FocusDirective } from '../../shared/focus/focus.directive';
import { EMAIL_REGEX } from '../../core/typings/email-regex';
import { Logger } from '../../core/logger/logger';
import { HttpService } from '../../core/http/http.service';
import { ObjectService } from '../../core/object/object.service';
import { UserService } from '../../core/user/user.service';
import { Languages } from '../../core/lang/languages';
import { APIHandle } from '../../core/http/api-handle';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/pluck';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'gn-general',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.css']
})
export class GeneralComponent implements OnDestroy {
    @ViewChild(FocusDirective) emailInput: FocusDirective;
    emailRegex = EMAIL_REGEX;
    isEditing$ = new BehaviorSubject<boolean>(false);
    studyLanguageOptions: any;

    credentials: any = {
        email: '',
        password: {current: '', replace: '', confirm: ''}
    };

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private http: HttpService, private objectService: ObjectService, public user: UserService) {
        this.studyLanguageOptions = objectService.renameProperty(Languages, [['code', 'value'], ['name', 'title']]);

        this.isEditing$.filter(b => !b).subscribe(() => this.credentials.email = '');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.each(this.subscriptions, s => s.unsubscribe());
    }

    onSubmitEmail(): void {
        this.logger.debug(this, 'onSubmitEmail()');
        this.subscriptions.push(
            this.http.request(APIHandle.EDIT_EMAIL, {body: {email: this.credentials.email}}).subscribe()
        );
    }
}
