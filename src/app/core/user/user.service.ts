/**
 * user.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/02/19.
 */

import { Injectable } from '@angular/core';

import { kCurrentUser, kAuthToken, kAuthTokenExpire, kAcceptLocalStorage, kCurrentStudySession } from '../local-storage/local-storage-keys';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LangService } from '../lang/lang.service';
import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';
import { Language } from '../typings/language';
import { APIErrors } from '../http/api-error';
import { Logger } from '../logger/logger';
import { User } from '../entities/user';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

@Injectable()
export class UserService {

    authenticated$        = new BehaviorSubject<boolean>(false);
    current$              = new BehaviorSubject<User>(this.localStorage.getItem(kCurrentUser));
    currentStudyLanguage$ = new ReplaySubject<Language>(1);
    compliant$            = new BehaviorSubject<boolean>(this.localStorage.getItem(kAcceptLocalStorage) || false);
    logout$               = new Subject<void>();

    $setEmailNotificationsEnabled = new Subject<boolean>();
    $setBrowserNotificationsEnabled = new Subject<boolean>();

    constructor(private lang: LangService, private localStorage: LocalStorageService, private logger: Logger, private http: HttpService) {
        // todo: Don't change the current study language every time you change the default study language
        // this.current$.filter(_.isObject).pluck('default_study_language').subscribe();
        this.currentStudyLanguage$.next(this.lang.languageForCode('en'));

        this.current$.filter(_.isObject).filter(this.isAuthenticated.bind(this)).mapTo(true).subscribe(this.authenticated$);
        this.logout$.mapTo(false).subscribe(this.authenticated$);
        this.current$.filter(_.isObject).mapTo(true).subscribe(this.compliant$);

        this.$setEmailNotificationsEnabled.distinctUntilChanged().concatMap((value: boolean) => {
            return this.http.request(APIHandle.UPDATE_USER, {body: {email_notifications_enabled: value}});
        }, (value: boolean) => {
            this.updateCache({email_notifications_enabled: value});
        }).subscribe(null, (errors: APIErrors) => {
            // this is the error handler
        });

        this.$setBrowserNotificationsEnabled.distinctUntilChanged().concatMap((value: boolean) => {
            return this.http.request(APIHandle.UPDATE_USER, {body: {browser_notifications_enabled: value}});
        }, (value: boolean) => {
            this.updateCache({browser_notifications_enabled: value});
        }).subscribe(null, (errors: APIErrors) => {
            // this is the error handler
        });
    }

    updateCache(user: User): void {
        if (!_.isObject(user)) {
            return;
        }

        if (user.is_silhouette_picture) {
            user.picture_url = 'https://storage.googleapis.com/stg.getnativelearning.com/assets/images/silhouette-avatar.jpg';
        }

        const cache = _.defaultTo(this.localStorage.getItem(kCurrentUser), {});

        this.logger.debug(this, 'Updating cached user', user);

        _.assign(cache, user);
        this.localStorage.setItem(kCurrentUser, cache);

        // this only needs to be done once
        this.localStorage.setItem(kAcceptLocalStorage, true);

        this.current$.next(cache);
    }

    logout(): void {
        this.logger.debug(this, 'logout');

        this.localStorage.removeItem(kAuthToken);
        this.localStorage.removeItem(kAuthTokenExpire);
        this.localStorage.removeItem(kCurrentUser);
        this.localStorage.removeItem(kCurrentStudySession);

        this.logout$.next();
    }

    comply(): void {
        this.logger.debug(this, 'comply');
        this.localStorage.setItem(kAcceptLocalStorage, true);
        this.compliant$.next(true);
    }

    update(user: User): void {
        this.logger.debug(this, 'update', user);

        if (_.has(user, 'email_notifications_enabled')) {
            this.$setEmailNotificationsEnabled.next(user.email_notifications_enabled);
        }

        if (_.has(user, 'browser_notifications_enabled')) {
            this.$setBrowserNotificationsEnabled.next(user.browser_notifications_enabled);
        }
    }

    isAuthenticated(): boolean {
        let authenticated = false;

        if (this.localStorage.hasItem(kAuthToken) && this.localStorage.hasItem(kAuthTokenExpire)) {
            if (_.toNumber(this.localStorage.getItem(kAuthTokenExpire)) > Date.now()) {
                authenticated = true;
            }
        }

        return authenticated;
    }

}
