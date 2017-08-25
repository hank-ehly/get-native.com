import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';
import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';
import { User } from '../entities/user';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfirmEmailUpdateResolver implements Resolve<void> {
    constructor(private http: HttpService, private router: Router, private user: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        return this.http.request(APIHandle.CONFIRM_EMAIL_UPDATE, {body: {token: route.queryParams['token']}}).map((user: User) => {
            this.user.updateCache(user);
            this.router.navigate(['/settings']);
        }).toPromise().catch(() => {
            this.router.navigate(['']);
            return null;
        });
    }
}
