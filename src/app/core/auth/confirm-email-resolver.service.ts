/**
 * confirm-email-resolver.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/04/20.
 */

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';
import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';
import { User } from '../entities/user';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConfirmEmailResolver implements Resolve<void> {
    constructor(private http: HttpService, private router: Router, private user: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        return this.http.request(APIHandle.CONFIRM_EMAIL, {body: {token: route.queryParams['token']}}).map((user: User) => {
            this.user.update(user);
            this.router.navigate(['/dashboard']);
        }).toPromise().catch(async () => {
            this.router.navigate(['']);
            return null;
        });
    }
}
