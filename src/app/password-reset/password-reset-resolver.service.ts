import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class PasswordResetResolverService implements Resolve<string> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
        return _.defaultTo(route.queryParams['token'], '');
    }

}
