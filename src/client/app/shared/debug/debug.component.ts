/**
 * debug.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-debug',
    templateUrl: 'debug.component.html',
    styleUrls: ['debug.component.css']
})
export class DebugComponent {
    @Output() authorize: EventEmitter<boolean>;
    routes: any[];

    constructor() {
        this.authorize = new EventEmitter<boolean>();
        this.routes = [
            {title: 'Dashboard', name: 'dashboard'},
            {title: 'Help',  name: '/help'},
            {title: 'Home', name: ''},
            {title: 'Library', name: '/library'},
            {title: 'Library Detail', name: '/library/1'},
            {title: 'Privacy', name: '/privacy'},
            {title: 'Settings', name: '/settings'},
            {title: 'Study (Listening)', name: '/study/listening'},
            {title: 'Study (Shadowing)', name: '/study/shadowing'},
            {title: 'Study (Speaking)', name: '/study/speaking'},
            {title: 'Study (Writing)', name: '/study/writing'},
            {title: 'Study (Results)', name: '/study/results'},
            {title: 'Study (Transition)', name: '/study'}
        ];
    }

    onToggleAuthorized(b: boolean): void {
        this.authorize.emit(b);
    }
}
