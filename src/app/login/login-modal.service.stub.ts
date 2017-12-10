/**
 * login.service.stub
 * getnativelearning.com
 *
 * Created by henryehly on 2017/01/29.
 */

import { LoginModalService } from './login-modal.service';

import { Subject } from 'rxjs/Subject';

export const STUBLoginModalService: LoginModalService = <LoginModalService>{
    setActiveViewEmitted: new Subject<string>().asObservable()
};
