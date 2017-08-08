import { Component } from '@angular/core';

@Component({
    selector: 'gn-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
    activityItems = [
        {
            title: 'System Maintenance Notice',
            created_at: 'Mon Jul 31 20:22:37 +0900 2017',
            body: `getnative will be temporarily unavailable on Friday, August 15th from 11:00 AM to 2:00 PM (ETC) for system
maintenance. We apologize for the inconvenience.`,
            footer: '{Contact us|help}'
        }
    ];
}
