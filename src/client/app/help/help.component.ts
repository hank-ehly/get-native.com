/**
 * help.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-help',
    templateUrl: 'help.component.html',
    styleUrls: ['help.component.css']
})

export class HelpComponent {
    items: string[] = [
        'First Item',
        'Second Item',
        'Third Item'
    ];
}
