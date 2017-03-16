/**
 * notifications.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { SwitchComponent } from '../../shared/switch/switch.component';
import { User } from '../../core/entities/user';
import { Logger } from '../../core/logger/logger';
import { HttpService } from '../../core/http/http.service';
import { UserService } from '../../core/user/user.service';
import { APIHandle } from '../../core/http/api-handle';

import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'gn-notifications',
    templateUrl: 'notifications.component.html',
    styleUrls: ['notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
    @ViewChild('emailSwitch') emailSwitch: SwitchComponent;
    @ViewChild('browserSwitch') browserSwitch: SwitchComponent;
    user: User;

    private subscriptions: Subscription[] = [];

    constructor(private logger: Logger, private http: HttpService, private userService: UserService) {
    }

    ngOnInit() {
        this.logger.warn(this, '[TODO] Initialize notification preference values.');
        this.userService.current.then(u => this.user = u);
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'ngOnDestroy - Unsubscribe all', this.subscriptions);
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
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
