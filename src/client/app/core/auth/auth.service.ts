/**
 * auth.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/05.
 */

import { Injectable } from '@angular/core';

import { LocalStorageService, Logger, kAuthToken, kAuthTokenExpire, ToolbarService, User, HttpService, APIHandle } from '../index';

@Injectable()
export class AuthService {
    private _currentUser: User;

    getCurrentUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            if (!this._currentUser) {
                this.http.request(APIHandle.ACCOUNT).subscribe((user: User) => {
                    this._currentUser = user;
                    resolve(user);
                });
            } else {
                resolve(this._currentUser);
            }
        });
    }

    constructor(private logger: Logger, private localStorage: LocalStorageService, private toolbar: ToolbarService,
                private http: HttpService) {
        this.toolbar.logout$.subscribe(this.onToolbarLogout.bind(this));
    }

    isLoggedIn(): boolean {
        if (this.localStorage.hasItem(kAuthToken)) {
            let now = Date.now();
            let exp = parseFloat(this.localStorage.getItem(kAuthTokenExpire));

            if (exp > now) {
                return true;
            }
        }

        return false;
    }

    onToolbarLogout(): void {
        this.logger.debug(this, 'onToolbarLogout()');
        this.localStorage.removeItem(kAuthTokenExpire);
        this.localStorage.removeItem(kAuthToken);
    }
}
