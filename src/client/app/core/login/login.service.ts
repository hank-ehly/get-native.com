/**
 * login.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/15.
 */

import { Injectable } from '@angular/core';

import { MockHTTPClient } from '../mock-http-client/mock-http-client';
import { Logger } from '../logger/logger';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
    constructor(private http: MockHTTPClient, private logger: Logger) {
    }

    login(credentials: any): Observable<any> {
        this.logger.debug('Received credentials: ', credentials);

        return this.http.POST_login(credentials);
    }
}
