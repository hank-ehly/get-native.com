/**
 * login.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/15.
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpService, APIHandle, User } from '../index';

@Injectable()
export class LoginService {
    constructor(private httpService: HttpService) {
    }

    login(credentials: any): Observable<User> {
        return this.httpService.request(APIHandle.LOGIN, {body: credentials});
    }
}
