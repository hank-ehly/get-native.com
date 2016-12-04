/**
 * auth.service
 * get-native.com
 *
 * Created by henryehly on 2016/12/04.
 */

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()

export class AuthService {
    authenticateSource = new Subject<boolean>();
    authenticate$ = this.authenticateSource.asObservable();

    authenticate(value: boolean): void {
        this.authenticateSource.next(value);
    }
}
