/**
 * user.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/19.
 */

import { Injectable } from '@angular/core';

import { User } from '../entities/user';
import { Language } from '../typings/language';
import { LangService } from '../lang/lang.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { kCurrentUser, kAuthToken, kAuthTokenExpire, kAcceptLocalStorage } from '../local-storage/local-storage-keys';
import { Logger } from '../logger/logger';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
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

    constructor(private lang: LangService, private localStorage: LocalStorageService, private logger: Logger) {
        this.current$.filter(_.isObject).map((u: User) => this.lang.languageForCode(u.default_study_language_code))
            .subscribe(this.currentStudyLanguage$);

        this.current$.filter(_.isObject).mapTo(true).subscribe(this.authenticated$);
        this.logout$.mapTo(false).subscribe(this.authenticated$);

        this.current$.filter(_.isObject).mapTo(true).subscribe(this.compliant$);
    }

    update(user: User): void {
        if (!_.isObject(user)) {
            return;
        }

        this.logger.debug(this, 'Update current user info', user);

        this.localStorage.setItem(kCurrentUser, user);

        // this only needs to be done once
        this.localStorage.setItem(kAcceptLocalStorage, true);

        this.current$.next(user);
    }

    logout(): void {
        this.logger.debug(this, 'logout');

        this.localStorage.removeItem(kAuthToken);
        this.localStorage.removeItem(kAuthTokenExpire);
        this.localStorage.removeItem(kCurrentUser);

        this.logout$.next();
    }

    comply(): void {
        this.localStorage.setItem(kAcceptLocalStorage, true);
        this.compliant$.next(true);
    }
}
