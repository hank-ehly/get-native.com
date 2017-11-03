import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { kAuthToken, kAuthTokenExpire } from '../local-storage/local-storage-keys';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';
import { DOMService } from '../dom/dom.service';
import { APIHandle } from '../http/api-handle';
import { APIErrors } from '../http/api-error';
import { User } from '../entities/user';

import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OAuthGuard implements CanActivate {

    constructor(private user: UserService, private localStorage: LocalStorageService, private http: HttpService, private router: Router,
                private dom: DOMService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const expectedKeys = ['token', 'expires'];
        const queryParams = <any>_.pick(next.queryParams, expectedKeys);
        if (_.size(queryParams) !== expectedKeys.length) {
            return this.user.isAuthenticated();
        }

        this.localStorage.setItem(kAuthToken, next.queryParams['token']);
        this.localStorage.setItem(kAuthTokenExpire, next.queryParams['expires']);

        return this.http.request(APIHandle.ME)
            .map(this.onUserDetailNext.bind(this))
            .catch(this.onUserDetailError.bind(this))
            .map(user => !_.isUndefined(user));
    }

    private onUserDetailNext(user: User) {
        this.user.update(user);
        this.router.navigate(['/dashboard']);
    }

    private onUserDetailError(errors: APIErrors) {
        this.router.navigate(['']).then(() => this.dom.alert(_.first(errors).message));
    }

}
