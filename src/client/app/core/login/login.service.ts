/**
 * login.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/15.
 */

import { Injectable } from '@angular/core';

import { MockHTTPClient } from '../mock-http-client/mock-http-client';
import { Logger } from '../logger/logger';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

/* Todo: Remove UI logic from Login Service */

@Injectable()
export class LoginService {
    showModalSource = new Subject();
    showModal$ = this.showModalSource.asObservable();

    hideModalSource = new Subject();
    hideModal$ = this.hideModalSource.asObservable();

    setActiveViewSource = new Subject<string>();
    setActiveView$ = this.setActiveViewSource.asObservable();

    constructor(private http: MockHTTPClient, private logger: Logger) {
    }

    showModal(): void {
        this.showModalSource.next();
    }

    hideModal(): void {
        this.hideModalSource.next();
    }

    setActiveView(view: string): void {
        this.setActiveViewSource.next(view);
    }

    login(credentials: any): Observable<any> {
        this.logger.debug('Received credentials: ', credentials);

        return this.http.POST_login(credentials);
    }
}
