/**
 * login.service.stub
 * get-native.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { LoginModalService } from './login-modal.service';

import { Subject } from 'rxjs/Subject';

export const STUBLoginModalService: LoginModalService = <LoginModalService>{
    showModal$: new Subject().asObservable(),
    hideModal$: new Subject().asObservable(),
    setActiveView$: new Subject<string>().asObservable()
};
