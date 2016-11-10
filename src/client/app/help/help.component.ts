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
    moderator: string = 'getnative.moderator@gmail.com';

    // TODO: Remove
    mockDetailText: string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias consequatur ' +
        'cupiditate, dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident quod tenetur ' +
        'voluptates voluptatibus? Cupiditate, est? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, ' +
        'alias consequatur cupiditate, dolores eos esse ex in inventore ipsam laudantium odio odit possimus provident ' +
        'quod tenetur voluptates voluptatibus? Cupiditate, est?';
}
