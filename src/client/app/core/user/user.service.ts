/**
 * user.service
 * get-native.com
 *
 * Created by henryehly on 2017/02/19.
 */

import { Injectable } from '@angular/core';

import { Language } from '../typings/language';
import { User } from '../entities/user';
import { HttpService } from '../http/http.service';
import { APIHandle } from '../http/api-handle';
import { LangService } from '../lang/lang.service';

@Injectable()
export class UserService {
    private _current: User;

    get current(): Promise<User> {
        return new Promise((resolve, reject) => {
            if (!this._current) {
                this.http.request(APIHandle.ACCOUNT).subscribe((user: User) => {
                    this._current = user;
                    resolve(user);
                });
            } else {
                resolve(this._current);
            }
        });
    }

    get defaultStudyLanguage(): Promise<Language> {
        return this.current.then((u) => this.langService.languageForCode(u.default_study_language));
    }

    constructor(private http: HttpService, private langService: LangService) {
    }
}
