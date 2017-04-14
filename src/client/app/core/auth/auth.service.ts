/**
 * auth.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/05.
 */

import { Injectable } from '@angular/core';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { kAuthToken, kAuthTokenExpire } from '../local-storage/local-storage-keys';
import { Logger } from '../logger/logger';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
    logout$ = new Subject<any>();

    constructor(private localStorage: LocalStorageService, private logger: Logger) {
        this.logout$.subscribe(this.onLogout.bind(this));
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

    private onLogout(): void {
        this.logger.debug(this, 'onLogout');
        this.localStorage.removeItem(kAuthToken);
        this.localStorage.removeItem(kAuthTokenExpire);
    }
}
