/**
 * tos.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/10.
 */

import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-tos',
    templateUrl: 'tos.component.html',
    styleUrls: ['tos.component.css']
})

export class TOSComponent {
    // TODO: Move to global scope
    moderator: string = 'getnative.moderator@gmail.com';
    lastEdited: string = '2016-11-11';
}
