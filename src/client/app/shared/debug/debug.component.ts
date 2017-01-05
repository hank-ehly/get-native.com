/**
 * debug.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/24.
 */

import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { LocalStorageService } from '../../core/local-storage/local-storage.service';
import { kDebugLoggedIn } from '../../core/local-storage/local-storage-keys';
import { Logger } from '../../core/logger/logger';

@Component({
    moduleId: module.id,
    selector: 'gn-debug',
    templateUrl: 'debug.component.html',
    styleUrls: ['debug.component.css']
})
export class DebugComponent implements OnInit {
    @Output() authorize: EventEmitter<boolean>;
    routes: any[];
    authorized: boolean;

    constructor(private localStorage: LocalStorageService, private logger: Logger) {
        this.authorize = new EventEmitter<boolean>();
        this.authorized = false;
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

    ngOnInit(): void {
        this.authorized = this.localStorage.getItem(kDebugLoggedIn);
        this.authorize.emit(this.authorized);
        this.logger.debug(this.localStorage.getItem(kDebugLoggedIn));
    }

    onToggleAuthorized(b: boolean): void {
        this.authorize.emit(b);
        this.localStorage.setItem(kDebugLoggedIn, b);
        this.authorized = b;
    }

    onClickClearStorage(): void {
        this.localStorage.clear();
    }
}
