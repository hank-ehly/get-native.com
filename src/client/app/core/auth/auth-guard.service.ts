/**
 * auth-guard.service
 * get-native.com
 *
 * Created by henryehly on 2017/01/05.
 */

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

import { Observable } from 'rxjs/Observable';
import { Logger } from '../logger/logger';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private auth: AuthService, private logger: Logger) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (this.auth.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['']).then(() => {
            this.logger.info(this, `Unable to activate route ${route}. Forced navigation to homepage.`);
        });

        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.canActivate(childRoute, state);
    }
}
