/**
 * notifications.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { SwitchComponent } from '../../shared/switch/switch.component';
import { Logger, HttpService, APIHandle } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-notifications',
    templateUrl: 'notifications.component.html',
    styleUrls: ['notifications.component.css']
})
export class NotificationsComponent implements AfterViewInit {
    @ViewChild('emailSwitch') emailSwitch: SwitchComponent;
    @ViewChild('browserSwitch') browserSwitch: SwitchComponent;

    constructor(private logger: Logger, private http: HttpService) {
    }

    ngAfterViewInit() {
        this.logger.warn(`[${this.constructor.name}][TODO] Initialize notification preference values.`);
    }

    onToggleEmailNotifications(value: boolean): void {
        this.logger.debug(`[${this.constructor.name}] onToggleEmailNotifications(${value})`);
        this.http.request(APIHandle.EDIT_ACCOUNT, {body: {email_notifications_enabled: value}}).subscribe();
    }

    onToggleBrowserNotifications(value: boolean): void {
        this.logger.debug(`[${this.constructor.name}] onToggleBrowserNotifications(${value})`);
        this.http.request(APIHandle.EDIT_ACCOUNT, {body: {browser_notifications_enabled: value}}).subscribe();
    }
}
