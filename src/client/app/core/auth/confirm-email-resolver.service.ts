/**
 * confirm-email-resolver.service
 * get-native.com
 *
 * Created by henryehly on 2017/04/20.
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserService } from '../user/user.service';
import { User } from '../entities/user';

@Injectable()
export class ConfirmEmailResolver implements Resolve<void> {
    constructor(private http: HttpService, private router: Router, private user: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        return this.http.request(APIHandle.CONFIRM_EMAIL, {body: {token: route.queryParams['token']}}).map((user: User) => {
            this.user.update(user);
            this.router.navigate(['/dashboard']);
        }).toPromise().catch(() => {
            this.router.navigate(['']);
            return null;
        });
    }
}
