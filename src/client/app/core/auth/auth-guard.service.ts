/**
 * auth-guard.service
 * get-native.com
 *
 * Created by henryehly on 2017/01/05.
 */

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Logger } from '../index';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private logger: Logger) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        this.logger.debug(`${this.constructor.name}#canActivate ${route}, ${state}`);
        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.canActivate(childRoute, state);
    }
}
