/**
 * login-modal.service
 * getnative.org
 *
 * Created by henryehly on 2017/01/29.
 */

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginModalService {

    setActiveViewEmitted: Observable<string>;
    closeEmitted: Observable<void>;
    private setActiveViewSource: Subject<string>;
    private closeSource: Subject<void>;

    constructor() {
        this.setActiveViewSource = new Subject<string>();
        this.closeSource = new Subject<void>();
        this.setActiveViewEmitted = this.setActiveViewSource.asObservable();
        this.closeEmitted = this.closeSource.asObservable();
    }

    setActiveView(view: string): void {
        this.setActiveViewSource.next(view);
    }

    close(): void {
        this.closeSource.next();
    }

}
