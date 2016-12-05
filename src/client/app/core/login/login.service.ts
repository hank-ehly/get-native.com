/**
 * login.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/15.
 */

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginService {
    showModalSource = new Subject();
    showModal$ = this.showModalSource.asObservable();

    hideModalSource = new Subject();
    hideModal$ = this.hideModalSource.asObservable();

    setActiveViewSource = new Subject<string>();
    setActiveView$ = this.setActiveViewSource.asObservable();

    showModal(): void {
        this.showModalSource.next();
    }

    hideModal(): void {
        this.hideModalSource.next();
    }

    setActiveView(view: string): void {
        this.setActiveViewSource.next(view);
    }
}
