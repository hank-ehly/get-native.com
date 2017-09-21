/**
 * user.service
 * getnativelearning.com
 *
 * Created by henryehly on 2017/02/19.
 */

import { Injectable } from '@angular/core';

import {
    kCurrentUser,
    kAuthToken,
    kAuthTokenExpire,
    kAcceptLocalStorage,
    kCurrentStudySession,
    kCurrentStudyLanguage
} from '../local-storage/local-storage-keys';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Language } from '../typings/language';
import { Logger } from '../logger/logger';
import { User } from '../entities/user';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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

    current$ = new BehaviorSubject<User>(this.localStorage.getItem(kCurrentUser));
    authenticated$ = new BehaviorSubject<boolean>(false);
    compliant$ = new BehaviorSubject<boolean>(this.localStorage.getItem(kAcceptLocalStorage) || false);
    logout$ = new Subject<void>();
    currentStudyLanguage$ = new BehaviorSubject<Language>(this.localStorage.getItem(kCurrentStudyLanguage) || null);

    constructor(private localStorage: LocalStorageService, private logger: Logger) {
        this.current$
            .filter(this.isAuthenticated.bind(this))
            .mapTo(true)
            .subscribe(this.authenticated$);

        this.current$
            .filter(this.isAuthenticated.bind(this))
            .mapTo(true)
            .subscribe(this.compliant$);

        this.logout$
            .mapTo(false)
            .subscribe(this.authenticated$);

        this.current$
            .filter(this.isAuthenticated.bind(this))
            .map((u: User) => _.defaultTo(this.currentStudyLanguage$.getValue(), u.default_study_language))
            .subscribe(this.currentStudyLanguage$);
    }

    update(user: User): void {
        if (!_.isObject(user)) {
            this.logger.debug(this, 'user is not an object', user);
            return;
        }

        if (user.is_silhouette_picture) {
            user.picture_url = 'https://storage.googleapis.com/stg.getnativelearning.com/assets/images/silhouette-avatar.jpg';
        }

        const cache: User = _.defaultTo(this.localStorage.getItem(kCurrentUser), {});
        _.assign(cache, user);

        if (!this.localStorage.hasItem(kCurrentStudyLanguage) && _.has(cache, 'default_study_language.code')) {
            this.setCurrentStudyLanguage(cache.default_study_language);
        }

        this.comply();

        this.localStorage.setItem(kCurrentUser, cache);
        this.current$.next(cache);
    }

    logout(): void {
        this.logger.debug(this, 'logout');

        const keysToRemove = [kAuthToken, kAuthTokenExpire, kCurrentUser, kCurrentStudySession, kCurrentStudyLanguage];
        _.each(keysToRemove, this.localStorage.removeItem);

        this.logout$.next();
    }

    comply(): void {
        this.logger.debug(this, 'comply');
        this.localStorage.setItem(kAcceptLocalStorage, true);
        this.compliant$.next(true);
    }

    setCurrentStudyLanguage(language: Language): void {
        this.logger.debug(this, 'setting current study language');
        this.localStorage.setItem(kCurrentStudyLanguage, language);
        this.currentStudyLanguage$.next(language);
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
