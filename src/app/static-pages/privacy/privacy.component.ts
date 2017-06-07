/**
 * privacy.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/07.
 */

import { Component } from '@angular/core';

import { Config } from '../../shared/config/env.config';

@Component({
    selector: 'gn-privacy',
    templateUrl: 'privacy.component.html',
    styleUrls: ['privacy.component.scss']
})
export class PrivacyComponent {
    moderator: string = Config.moderator;
    lastEdited = '2016-11-07';
}
