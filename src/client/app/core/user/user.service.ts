/**
 * user.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/19.
 */

import { Injectable } from '@angular/core';

import { User } from '../entities/user';
import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';
import { LangService } from '../lang/lang.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Logger } from '../logger/logger';
import { kCurrentUser } from '../local-storage/local-storage-keys';
import { Language } from '../typings/language';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class UserService {
    currentStudyLanguage$ = new ReplaySubject<Language>(1);

    private current$ = new BehaviorSubject<User>(
        this.localStorage.getItem(kCurrentUser) || null
    );

    get current(): Observable<User> {
        let currentValue = this.current$.getValue();

        if (currentValue) {
            return Observable.of(currentValue);
        }

        return this.http.request(APIHandle.ACCOUNT).do(user => {
            this.localStorage.setItem(kCurrentUser, user);
            this.current$.next(user);
        });
    }

    constructor(private http: HttpService, private langService: LangService, private localStorage: LocalStorageService,
                private logger: Logger) {
        this.logger.debug(this, 'constructor');
    }
}
