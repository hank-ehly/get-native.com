/**
 * user.service.spec
 * get-native.com
 *
 * Created by henryehly on 2017/04/09.
 */

import { UserService } from './user.service';
import { STUBHttpService } from '../http/http.service.stub';
import { LangService } from '../lang/lang.service';
import { STUBLocalStorageService } from '../local-storage/local-storage.service.stub';
import { Logger } from '../logger/logger';
import { LocalStorageService } from '../local-storage/local-storage.service';

describe('UserService', () => {
    let service: UserService = null;

    beforeEach(() => {
        service = new UserService(STUBHttpService, new LangService(), new LocalStorageService(new Logger()), new Logger());
    });

    it(`should return the current user immediately if the user data is present in localStorage`, function() {

    });

    it(`should return null immediately if the user data is not present in localStorage`, function() {

    });

    it(`should return the current users' default study language`);

    it(`should return the current users' current study language`);
});
