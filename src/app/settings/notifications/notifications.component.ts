/**
 * notifications.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, OnDestroy } from '@angular/core';

import { HttpService } from '../../core/http/http.service';
import { UserService } from '../../core/user/user.service';
import { APIHandle } from '../../core/http/api-handle';
import { APIErrors } from '../../core/http/api-error';
import { Logger } from '../../core/logger/logger';
import { User } from '../../core/entities/user';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import * as _ from 'lodash';

@Component({
    selector: 'gn-notifications',
    templateUrl: 'notifications.component.html',
    styleUrls: ['notifications.component.scss']
})
export class NotificationsComponent implements OnDestroy {

    user: User = this.userService.current$.getValue();
    OnDestroy$ = new Subject<void>();

    errors = {
        browserNotificationsEnabled: null,
        emailNotificationsEnabled: null
    };

    flags = {
        processing: {
            browserNotificationsEnabled: false,
            emailNotificationsEnabled: false
        }
    };

    constructor(private userService: UserService, private http: HttpService, private logger: Logger) {
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    updateEmailPreference(value: boolean) {
        this.flags.processing.emailNotificationsEnabled = true;
        this.http.request(APIHandle.UPDATE_USER, {body: {email_notifications_enabled: value}})
            .takeUntil(this.OnDestroy$)
            .subscribe(
                this.onUpdateEmailNotificationsEnabledNext.bind(this, value),
                this.onUpdateEmailNotificationsEnabledError.bind(this)
            );
    }

    updateBrowserPreference(value: boolean) {
        this.flags.processing.browserNotificationsEnabled = true;
        this.http.request(APIHandle.UPDATE_USER, {body: {browser_notifications_enabled: value}})
            .takeUntil(this.OnDestroy$)
            .subscribe(
                this.onUpdateBrowserNotificationsEnabledNext.bind(this, value),
                this.onUpdateBrowserNotificationsEnabledError.bind(this)
            );
    }

    isEmailVerificationsOn(): boolean {
        return this.user.email_verified ? this.user.email_notifications_enabled : false;
    }

    private onUpdateEmailNotificationsEnabledNext(value: boolean): void {
        this.flags.processing.emailNotificationsEnabled = false;
        this.userService.update({email_notifications_enabled: value});
    }

    private onUpdateEmailNotificationsEnabledError(errors: APIErrors): void {
        this.flags.processing.emailNotificationsEnabled = false;
        if (errors && errors.length) {
            this.errors.emailNotificationsEnabled = _.first(errors);
        } else {
            this.errors.emailNotificationsEnabled = {code: 'Unknown', message: 'Unknown error'};
        }
    }

    private onUpdateBrowserNotificationsEnabledNext(value: boolean): void {
        this.flags.processing.browserNotificationsEnabled = false;
        this.userService.update({browser_notifications_enabled: value});
    }

    private onUpdateBrowserNotificationsEnabledError(errors: APIErrors): void {
        this.flags.processing.browserNotificationsEnabled = false;
        if (errors && errors.length) {
            this.errors.browserNotificationsEnabled = _.first(errors);
        } else {
            this.errors.browserNotificationsEnabled = {code: 'Unknown', message: 'Unknown error'};
        }
    }

}
