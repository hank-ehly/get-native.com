/**
 * auth.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/05.
 */

import { Injectable } from '@angular/core';

import { LocalStorageService, Logger, kAuthToken, kAuthTokenExpire, ToolbarService } from '../index';

@Injectable()
export class AuthService {
    constructor(private logger: Logger, private localStorage: LocalStorageService, private toolbar: ToolbarService) {
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
