/**
 * login-modal.service
 * get-native.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginModalService {
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
