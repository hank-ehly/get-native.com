/**
 * user.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/19.
 */

import { Injectable } from '@angular/core';

import { kCurrentUser, kAuthToken, kAuthTokenExpire, kAcceptLocalStorage, kCurrentStudySession } from '../local-storage/local-storage-keys';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LanguageCode } from '../typings/language-code';
import { LangService } from '../lang/lang.service';
import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';
import { Language } from '../typings/language';
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

    // setters
    defaultStudyLanguage$ = new Subject<Language>();
    interfaceLanguage$ = new Subject<Language>();
    $setEmailNotificationsEnabled = new Subject<boolean>();
    $setBrowserNotificationsEnabled = new Subject<boolean>();
    password$ = new Subject<{current: string, replacement: string}>();

    interfaceLanguageEmitted$ = new Subject();

    // todo: Follow this convention of setters/getters
    // private emitChangeSource = new Subject<any>();
    // // Observable string streams
    // changeEmitted$ = this.emitChangeSource.asObservable();
    // // Service message commands
    // emitChange(change: any) {
    //     this.emitChangeSource.next(change);
    // }

    passwordChange$ = new Subject();

    constructor(private lang: LangService, private localStorage: LocalStorageService, private logger: Logger, private http: HttpService) {
        // todo: Don't change the current study language every time you change the default study language
        // this.current$.filter(_.isObject).pluck('default_study_language').subscribe();

        this.currentStudyLanguage$.next(this.lang.languageForCode('en'));

        this.current$.filter(_.isObject).mapTo(true).subscribe(this.authenticated$);
        this.logout$.mapTo(false).subscribe(this.authenticated$);

        this.current$.filter(_.isObject).mapTo(true).subscribe(this.compliant$);

        this.defaultStudyLanguage$.pluck('code').distinctUntilChanged().concatMap((code: LanguageCode) => {
            return this.http.request(APIHandle.UPDATE_USER, {body: {default_study_language_code: code}});
        }, (code: LanguageCode) => {
            this.updateCache({default_study_language: this.lang.languageForCode(code)});
        }).subscribe();

        this.interfaceLanguage$.pluck('code').distinctUntilChanged().concatMap((code: LanguageCode) => {
            return this.http.request(APIHandle.UPDATE_USER, {body: {interface_language_code: code}});
        }, (code: LanguageCode) => {
            this.updateCache({interface_language: this.lang.languageForCode(code)});
            this.interfaceLanguageEmitted$.next(code);
        }).subscribe();

        this.$setEmailNotificationsEnabled.distinctUntilChanged().concatMap((value: boolean) => {
            return this.http.request(APIHandle.UPDATE_USER, {body: {email_notifications_enabled: value}});
        }, (value: boolean) => {
            this.updateCache({email_notifications_enabled: value});
        }).subscribe();

        this.$setBrowserNotificationsEnabled.distinctUntilChanged().concatMap((value: boolean) => {
            return this.http.request(APIHandle.UPDATE_USER, {body: {browser_notifications_enabled: value}});
        }, (value: boolean) => {
            this.updateCache({browser_notifications_enabled: value});
        }).subscribe();

        this.password$.mergeMap((passwords) => {
            this.logger.debug(this, passwords);
            return this.http.request(APIHandle.EDIT_PASSWORD, {
                body: {
                    current_password: passwords.current,
                    new_password: passwords.replacement
                }
            });
        }).subscribe(this.passwordChange$);
    }

    updateCache(user: User): void {
        if (!_.isObject(user)) {
            return;
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

        if (_.has(user, 'default_study_language')) {
            this.defaultStudyLanguage$.next(user.default_study_language);
        }

        if (_.has(user, 'interface_language')) {
            this.interfaceLanguage$.next(user.interface_language);
        }

        if (_.has(user, 'email_notifications_enabled')) {
            this.$setEmailNotificationsEnabled.next(user.email_notifications_enabled);
        }

        if (_.has(user, 'browser_notifications_enabled')) {
            this.$setBrowserNotificationsEnabled.next(user.browser_notifications_enabled);
        }
    }

    updatePassword(current: string, replacement: string) {
        this.logger.debug(this, 'updatePassword');
        this.password$.next({current: current, replacement: replacement});
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
