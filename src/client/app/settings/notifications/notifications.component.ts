/**
 * notifications.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, ViewChild, OnDestroy } from '@angular/core';

import { SwitchComponent } from '../../shared/switch/switch.component';
import { Logger } from '../../core/logger/logger';
import { HttpService } from '../../core/http/http.service';
import { UserService } from '../../core/user/user.service';
import { APIHandle } from '../../core/http/api-handle';

import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'gn-notifications',
    templateUrl: 'notifications.component.html',
    styleUrls: ['notifications.component.css']
})
export class NotificationsComponent implements OnDestroy {
    @ViewChild('emailSwitch') emailSwitch: SwitchComponent;
    @ViewChild('browserSwitch') browserSwitch: SwitchComponent;

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private http: HttpService, public user: UserService) {
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.forEach(this.subscriptions, s => s.unsubscribe());
    }

    onToggleEmailNotifications(value: boolean): void {
        this.logger.debug(this, `onToggleEmailNotifications(${value})`);
        this.subscriptions.push(
            this.http.request(APIHandle.EDIT_ACCOUNT, {body: {email_notifications_enabled: value}}).subscribe()
        );
    }

    onToggleBrowserNotifications(value: boolean): void {
        this.logger.debug(this, `onToggleBrowserNotifications(${value})`);
        this.subscriptions.push(
            this.http.request(APIHandle.EDIT_ACCOUNT, {body: {browser_notifications_enabled: value}}).subscribe()
        );
    }
}
