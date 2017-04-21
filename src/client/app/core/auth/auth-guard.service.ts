/**
 * auth-guard.service
 * get-native.com
 *
 * Created by henryehly on 2017/01/05.
 */

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { Logger } from '../logger/logger';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { kAuthTokenExpire, kAuthToken } from '../local-storage/local-storage-keys';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private user: UserService, private logger: Logger, private localStorage: LocalStorageService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.logger.info(this, 'canActivate', state.url, route);

        const isLoggedIn = this.isLoggedIn();

        if (isLoggedIn && state.url === '/') {
            this.router.navigate(['dashboard']).then(() => this.logger.debug(this, 'Navigated to dashboard'));
            return false;
        }

        if (isLoggedIn) {
            return true;
        }

        if (!isLoggedIn && state.url === '/') {
            this.logger.debug(this, 'Allowing redirection to homepage because user is not logged in.');
            return true;
        }

        this.router.navigate(['']).then(() => this.logger.debug(this, 'Redirected to homepage.'));
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }

    isLoggedIn(): boolean {
        if (!this.localStorage.hasItem(kAuthToken)) {
            return false;
        }

        return this.localStorage.hasItem(kAuthTokenExpire) && +this.localStorage.getItem(kAuthTokenExpire) > Date.now();
    }
}
