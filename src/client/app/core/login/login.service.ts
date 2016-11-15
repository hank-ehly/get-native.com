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
    openModalSource = new Subject<string>();
    openModal$ = this.openModalSource.asObservable();

    openModal(): void {
        this.openModalSource.next();
    }
}
