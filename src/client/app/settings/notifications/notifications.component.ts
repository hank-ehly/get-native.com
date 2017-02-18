/**
 * notifications.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, ViewChild, OnInit } from '@angular/core';

import { SwitchComponent } from '../../shared/switch/switch.component';
import { Logger, HttpService, APIHandle, AuthService, User } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-notifications',
    templateUrl: 'notifications.component.html',
    styleUrls: ['notifications.component.css']
})
export class NotificationsComponent implements OnInit {
    @ViewChild('emailSwitch') emailSwitch: SwitchComponent;
    @ViewChild('browserSwitch') browserSwitch: SwitchComponent;
    user: User;

    constructor(private logger: Logger, private http: HttpService, private auth: AuthService) {
    }

    ngOnInit() {
        this.logger.warn(this, '[TODO] Initialize notification preference values.');

        this.auth.getCurrentUser().then((u: User) => this.user = u);
    }

    onToggleEmailNotifications(value: boolean): void {
        this.logger.debug(this, `onToggleEmailNotifications(${value})`);
        this.http.request(APIHandle.EDIT_ACCOUNT, {body: {email_notifications_enabled: value}}).subscribe();
    }

    onToggleBrowserNotifications(value: boolean): void {
        this.logger.debug(this, `onToggleBrowserNotifications(${value})`);
        this.http.request(APIHandle.EDIT_ACCOUNT, {body: {browser_notifications_enabled: value}}).subscribe();
    }
}
