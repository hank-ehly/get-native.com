import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { kAuthTokenExpire } from '../local-storage/local-storage-keys';
import { kAuthToken } from '../local-storage/local-storage-keys';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';
import { APIHandle } from '../http/api-handle';
import { User } from '../entities/user';

import * as _ from 'lodash';

@Injectable()
export class OAuthResolver implements Resolve<void> {

    constructor(private user: UserService, private localStorage: LocalStorageService, private http: HttpService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        const expectedKeys = ['token', 'expires'];
        const queryParams = <any>_.pick(route.queryParams, expectedKeys);
        if (_.size(queryParams) !== expectedKeys.length) {
            this.router.navigate(['']);
        }

        this.localStorage.setItem(kAuthToken, route.queryParams['token']);
        this.localStorage.setItem(kAuthTokenExpire, route.queryParams['expires']);

        return this.http.request(APIHandle.ME).map((user: User) => {
            this.user.update(user);
            this.router.navigate(['/dashboard']);
        }).toPromise().catch(async () => {
            this.router.navigate(['']);
            return null;
        });
    }

}
