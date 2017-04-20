/**
 * confirm-email-resolver.service
 * get-native.com
 *
 * Created by henryehly on 2017/04/20.
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConfirmEmailResolver implements Resolve<void> {
    constructor(private http: HttpService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
        let search = new URLSearchParams();
        search.set('token', route.queryParams['token']);

        return this.http.request(APIHandle.CONFIRM_EMAIL, {search: search}).map(() => {
            console.log('********');
            this.router.navigate(['/dashboard']);
        }).toPromise().catch(() => {
            console.log('++++++++');
            this.router.navigate(['']);
            return null;
        });
    }
}
