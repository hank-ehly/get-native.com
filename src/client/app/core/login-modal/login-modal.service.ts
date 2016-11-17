/**
 * login-modal.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/15.
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginModalService {
    showModalSource = new Subject();
    showModal$ = this.showModalSource.asObservable();

    showModal(): void {
        this.showModalSource.next();
    }
}
