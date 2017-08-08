/**
 * auth-guard.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/01/05.
 */

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { Logger } from '../logger/logger';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private user: UserService, private logger: Logger) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.logger.debug(this, 'canActivate', state.url, route);

        const isLoggedIn = this.user.isAuthenticated();

        if (isLoggedIn && state.url === '/') {
            this.router.navigate(['dashboard']).then(() => this.logger.debug(this, 'Redirect to dashboard'));
            return false;
        } else if (isLoggedIn || (!isLoggedIn && state.url === '/')) {
            return true;
        } else {
            this.router.navigate(['']).then(() => this.logger.debug(this, 'Redirect to home'));
            return false;
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }
}
