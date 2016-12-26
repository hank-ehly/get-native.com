/**
 * login.service.stub
 * get-native.com
 *
 * Created by henryehly on 2016/12/26.
 */

import { LoginService } from './login.service';

import { Subject } from 'rxjs/Subject';

export const STUBLoginService: LoginService = <LoginService>{
    showModal$: new Subject().asObservable(),
    hideModal$: new Subject().asObservable(),
    setActiveView$: new Subject<string>().asObservable()
};
