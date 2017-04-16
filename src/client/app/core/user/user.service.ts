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

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as _ from 'lodash';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { kCurrentUser } from '../local-storage/local-storage-keys';

@Injectable()
export class UserService {
    current$              = new BehaviorSubject<User>(this.localStorage.getItem(kCurrentUser));
    currentStudyLanguage$ = new ReplaySubject<Language>(1);

    private onUpdate$ = this.current$.filter(u => !_.isEmpty(u));

    constructor(private lang: LangService, private localStorage: LocalStorageService) {
        this.onUpdate$
            .do(u => this.localStorage.setItem(kCurrentUser, u))
            .map(u => this.lang.languageForCode(u.default_study_language_code))
            .subscribe(this.currentStudyLanguage$);
    }
}
