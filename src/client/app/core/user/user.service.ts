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
import { kCurrentUser, kAuthToken, kAuthTokenExpire } from '../local-storage/local-storage-keys';
import { Logger } from '../logger/logger';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Injectable()
export class UserService {
    currentStudyLanguage$ = new ReplaySubject<Language>(1);
    current$              = new BehaviorSubject<User>(this.localStorage.getItem(kCurrentUser));

    logout$               = new Subject<any>();

    private onUpdate$ = this.current$.filter(u => !_.isEmpty(u));

    constructor(private lang: LangService, private localStorage: LocalStorageService, private logger: Logger) {
        this.onUpdate$
            .do(u => this.localStorage.setItem(kCurrentUser, u))
            .map(u => this.lang.languageForCode(u.default_study_language_code))
            .subscribe(this.currentStudyLanguage$);

        this.logout$.subscribe(this.logout.bind(this));
    }

    isLoggedIn(): boolean {
        if (!this.localStorage.hasItem(kAuthToken)) {
            return false;
        }

        return this.localStorage.hasItem(kAuthTokenExpire) && +this.localStorage.getItem(kAuthTokenExpire) > Date.now();
    }

    private logout(): void {
        this.logger.debug(this, 'onLogout');
        this.localStorage.removeItem(kAuthToken);
        this.localStorage.removeItem(kAuthTokenExpire);
    }
}
