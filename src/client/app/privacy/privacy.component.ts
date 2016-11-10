/**
 * privacy.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/07.
 */

import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-privacy',
    templateUrl: 'privacy.component.html',
    styleUrls: ['privacy.component.css']
})

export class PrivacyComponent {
    moderator: string;

    constructor() {
        this.moderator = 'getnative.moderator@gmail.com';
    }
}
