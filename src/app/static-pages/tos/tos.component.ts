/**
 * tos.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/10.
 */

import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'gn-tos',
    templateUrl: 'tos.component.html',
    styleUrls: ['tos.component.scss']
})
export class TOSComponent {
    moderator: string = environment.moderator;
    lastEdited = '2016-11-11';
}
