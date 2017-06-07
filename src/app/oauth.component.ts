/**
 * oauth.component
 * get-native.com
 *
 * Created by henryehly on 2017/05/23.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { kAuthToken, kAuthTokenExpire, kCurrentUser } from './core/local-storage/local-storage-keys';
import { LocalStorageService } from './core/local-storage/local-storage.service';
import { Subscription } from 'rxjs/Subscription';
import { Logger } from './core/logger/logger';
import * as _ from 'lodash';
import { HttpService } from './core/http/http.service';
import { APIHandle } from './core/http/api-handle';
import { User } from './core/entities/user';
import { UserService } from './core/user/user.service';

// This should be a resolver
@Component({
    template: ''
})
export class OAuthComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];

    constructor(private route: ActivatedRoute, private localStorage: LocalStorageService, private router: Router, private logger: Logger,
                private http: HttpService, private user: UserService) {
    }

    ngOnInit(): void {
        this.logger.debug(this, 'OnInit');

        const queryParamsSubscription = this.route.queryParams.concatMap((params: Params) => {
            this.logger.debug(this, 'params', params);
            this.localStorage.setItem(kAuthToken, params['token']);
            this.localStorage.setItem(kAuthTokenExpire, params['expires']);
            return this.http.request(APIHandle.ME);
        }, (_: any, user: User) => {
            this.logger.debug(this, 'user', user);
            this.user.updateCache(user);
            this.router.navigate(['dashboard']);
        }).subscribe();

        this.subscriptions.push(queryParamsSubscription);
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        _.each(this.subscriptions, s => s.unsubscribe());
    }
}
