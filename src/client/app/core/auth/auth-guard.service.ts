/**
 * auth-guard.service
 * get-native.com
 *
 * Created by henryehly on 2017/01/05.
 */

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Logger } from '../logger/logger';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private auth: AuthService, private logger: Logger) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        this.logger.info(this, route, state);

        const isLoggedIn = this.auth.isLoggedIn();

        if (isLoggedIn && state.url === '/') {
            this.router.navigate(['dashboard']);
            return false;
        }

        if (isLoggedIn) {
            return true;
        }

        if (!isLoggedIn && state.url === '/') {
            this.logger.debug(this, 'Allowing redirection to homepage because user is not logged in.');
            return true;
        }

        this.router.navigate(['']).then(() => this.logger.debug(this, 'Forcing redirect to homepage.'));
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.canActivate(childRoute, state);
    }
}
