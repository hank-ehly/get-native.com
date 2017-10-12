/**
 * login-modal.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginModalService {
    setActiveViewSource = new Subject<string>();
    setActiveView$ = this.setActiveViewSource.asObservable();

    setActiveView(view: string): void {
        this.setActiveViewSource.next(view);
    }
}
