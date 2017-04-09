/**
 * user.service.spec
 * get-native.com
 *
 * Created by henryehly on 2017/04/09.
 */

import { UserService } from './user.service';
import { STUBHttpService } from '../http/http.service.stub';
import { LangService } from '../lang/lang.service';

describe('UserService', () => {
    let service = null;

    beforeEach(() => {
        service = new UserService(STUBHttpService, new LangService());
    });

    it(`should return the current user`, function() {

    });

    it(`should return the current users' default study language`);
    it(`should return the current users' current study language`);
});
