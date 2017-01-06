/**
 * auth-guard.service
 * get-native.com
 *
 * Created by henryehly on 2017/01/05.
 */

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LocalStorageService, kAuthToken, kAuthTokenExpire, kDebugLoggedIn } from '../index';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private localStorage: LocalStorageService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (this.localStorage.hasItem(kDebugLoggedIn) && this.localStorage.getItem(kDebugLoggedIn)) {
            return true;
        }

        if (this.localStorage.hasItem(kAuthToken)) {
            let now = Date.now();
            let exp = this.localStorage.getItem(kAuthTokenExpire);

            if (exp > now) {
                return true;
            }
        }

        this.router.navigate(['']);
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.canActivate(childRoute, state);
    }
}
