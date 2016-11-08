/**
 * privacy-policy.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/07.
 */

import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-privacy-policy',
    templateUrl: 'privacy-policy.component.html',
    styleUrls: ['privacy-policy.component.css']
})

export class PrivacyPolicyComponent {
    moderatorEmailAddress: string;

    constructor() {
        this.moderatorEmailAddress = 'getnative.moderator@gmail.com';
    }
}
