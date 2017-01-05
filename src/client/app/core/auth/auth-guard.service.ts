/**
 * auth-guard.service
 * get-native.com
 *
 * Created by henryehly on 2017/01/05.
 */

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Logger, LocalStorageService, kAuthToken, kAuthTokenExpire } from '../index';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private logger: Logger, private localStorage: LocalStorageService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (this.localStorage.hasItem(kAuthToken)) {
            let now = Date.now();
            let exp = this.localStorage.getItem(kAuthTokenExpire);

            this.logger.debug(`${this.constructor.name}#canActivate ${exp > now}`);
            return exp > now;
        }

        this.logger.debug(`${this.constructor.name}#canActivate false`);
        this.router.navigate(['']);
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.canActivate(childRoute, state);
    }
}
