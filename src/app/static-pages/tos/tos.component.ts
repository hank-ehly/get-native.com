/**
 * tos.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/10.
 */

import { Component } from '@angular/core';

import { Config } from '../../shared/config/env.config';

@Component({

    selector: 'gn-tos',
    templateUrl: 'tos.component.html',
    styleUrls: ['tos.component.css']
})
export class TOSComponent {
    moderator: string = Config.moderator;
    lastEdited: string = '2016-11-11';
}
