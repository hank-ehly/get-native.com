/**
 * debug.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Component } from '@angular/core';

import { LocalStorageService } from '../../core/local-storage/local-storage.service';

@Component({
    moduleId: module.id,
    selector: 'gn-debug',
    templateUrl: 'debug.component.html',
    styleUrls: ['debug.component.css']
})
export class DebugComponent {
    routes: any[];

    constructor(private localStorage: LocalStorageService) {
        this.routes = [
            {title: 'Dashboard', name: 'dashboard'},
            {title: 'Help', name: '/help'},
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

    onClickClearStorage(): void {
        this.localStorage.clear();
    }
}
