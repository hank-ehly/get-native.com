/**
 * privacy.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/07.
 */

import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'gn-privacy',
    templateUrl: 'privacy.component.html',
    styleUrls: ['privacy.component.scss']
})
export class PrivacyComponent {
    moderator: string = environment.moderator;
    lastEdited = '2016-11-07';
}
