import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { kAuthToken, kAuthTokenExpire } from '../core/local-storage/local-storage-keys';
import { LocalStorageService } from '../core/local-storage/local-storage.service';
import { UserService } from '../core/user/user.service';
import { HttpService } from '../core/http/http.service';
import { Entities } from '../core/entities/entities';
import { APIHandle } from '../core/http/api-handle';
import { Entity } from '../core/entities/entity';
import { Logger } from '../core/logger/logger';
import { User } from '../core/entities/user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

@Injectable()
export class DashboardResolveService implements Resolve<Entities<Entity>|Entity> {
    constructor(private localStorage: LocalStorageService, private logger: Logger,
                private http: HttpService, private user: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Entities<Entity>|Entity> {
        this.logger.debug(this, 'resolve', route, state);
        const expectedKeys = ['token', 'expires'];
        const queryParams = <any>_.pick(route.queryParams, expectedKeys);
        if (_.size(queryParams) === expectedKeys.length && _.every(queryParams, _.isString)) {
            this.localStorage.setItem(kAuthToken, route.queryParams['token']);
            this.localStorage.setItem(kAuthTokenExpire, route.queryParams['expires']);
            return this.http.request(APIHandle.ME).do((u: User) => this.user.updateCache(u));
        }
        return null;
    }
}
