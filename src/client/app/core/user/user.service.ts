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
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

@Injectable()
export class UserService {
    currentStudyLanguage$ = new ReplaySubject<Language>(1);
    authenticated$        = new BehaviorSubject<boolean>(false);
    logout$               = new Subject<any>();

    current$ = new BehaviorSubject<User>(this.localStorage.getItem(kCurrentUser));

    constructor(private lang: LangService, private localStorage: LocalStorageService, private logger: Logger) {
        this.current$
            .filter(_.isObject)
            .do((u: User) => this.logger.debug(this, u))
            .do(this.onUpdateUser.bind(this))
            .map((u: User) => this.lang.languageForCode(u.default_study_language_code))
            .subscribe(this.currentStudyLanguage$);

        this.current$
            .filter(_.isObject)
            .mapTo(true)
            .subscribe(this.authenticated$);

        this.logout$
            .do((user: User) => this.logger.debug(this, 'logout'))
            .do(this.onLogout.bind(this))
            .mapTo(false)
            .subscribe(this.authenticated$);
    }

    private onUpdateUser(user: User): void {
        this.localStorage.setItem(kCurrentUser, user);

        // this only needs to be done once
        this.localStorage.setItem(kAcceptLocalStorage, true);
    }

    private onLogout(): void {
        this.localStorage.removeItem(kAuthToken);
        this.localStorage.removeItem(kAuthTokenExpire);
        this.localStorage.removeItem(kCurrentUser);
    }
}
