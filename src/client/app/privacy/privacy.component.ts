/**
 * privacy.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/07.
 */

import { Component } from '@angular/core';

import { Config } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'gn-privacy',
    templateUrl: 'privacy.component.html',
    styleUrls: ['privacy.component.css']
})
export class PrivacyComponent {
    moderator: string = Config.moderator;
    lastEdited: string = '2016-11-07';
}
