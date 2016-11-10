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
    // TODO: Move to global scope
    moderator: string = 'getnative.moderator@gmail.com';
    lastEdited: string = '2016-11-07';
}
