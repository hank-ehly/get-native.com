/**
 * notifications.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { Component } from '@angular/core';

import { UserService } from '../../core/user/user.service';
import { User } from '../../core/entities/user';

@Component({
    selector: 'gn-notifications',
    templateUrl: 'notifications.component.html',
    styleUrls: ['notifications.component.scss']
})
export class NotificationsComponent {
    user: User = this.userService.current$.getValue();

    constructor(private userService: UserService) {
    }

    updateEmailPreference(value: boolean) {
        this.userService.update({email_notifications_enabled: value});
    }

    updateBrowserPreference(value: boolean) {
        this.userService.update({browser_notifications_enabled: value});
    }

    isEmailVerificationsOn(): boolean {
        return this.user.email_verified ? this.user.email_notifications_enabled : false;
    }
}
