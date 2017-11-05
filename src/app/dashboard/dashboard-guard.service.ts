import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from '../core/user/user.service';
import { Logger } from '../core/logger/logger';

import * as _ from 'lodash';

@Injectable()
export class DashboardGuard implements CanActivate {

    constructor(/*private logger: Logger, */private user: UserService) {
        // this.logger.debug(this, 'constructor');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const expectedKeys = ['token', 'expires'];
        const queryParams = <any>_.pick(route.queryParams, expectedKeys);
        const canActivate = this.user.isAuthenticated() || _.size(queryParams) === expectedKeys.length && _.every(queryParams, _.isString);
        // this.logger.debug(this, 'canActivate', canActivate);
        return canActivate;
    }

}
