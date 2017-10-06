import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { kAuthTokenExpire } from '../local-storage/local-storage-keys';
import { kAuthToken } from '../local-storage/local-storage-keys';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';
import { DOMService } from '../dom/dom.service';
import { APIHandle } from '../http/api-handle';
import { APIErrors } from '../http/api-error';
import { User } from '../entities/user';

import * as _ from 'lodash';

@Injectable()
export class OAuthResolver implements Resolve<any> {

    constructor(private user: UserService, private localStorage: LocalStorageService, private http: HttpService, private router: Router,
                private dom: DOMService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        const expectedKeys = ['token', 'expires'];
        const queryParams = <any>_.pick(route.queryParams, expectedKeys);
        if (_.size(queryParams) !== expectedKeys.length) {
            this.onUserDetailError([{code: 'Unknown', message: 'An unknown error occurred. Please try again later.'}]);
            return null;
        }

        this.localStorage.setItem(kAuthToken, route.queryParams['token']);
        this.localStorage.setItem(kAuthTokenExpire, route.queryParams['expires']);

        return this.http.request(APIHandle.ME)
            .map(this.onUserDetailNext.bind(this))
            .toPromise()
            .catch(this.onUserDetailError.bind(this));
    }

    private onUserDetailNext(user: User) {
        this.user.update(user);
        this.router.navigate(['/dashboard']);
    }

    private onUserDetailError(errors: APIErrors) {
        this.router.navigate(['']).then(() => {
            this.dom.alert(_.first(errors).message);
        });
    }

}
