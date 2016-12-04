/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';

import {
    AuthService,
    LocalStorageService,
    LoginService,
    LogoutService,
    NavbarService,
    StringService,
    PasswordService
} from './index';

@NgModule({
    providers: [
        AuthService,
        LocalStorageService,
        LoginService,
        LogoutService,
        NavbarService,
        PasswordService,
        StringService
    ]
})

export class CoreModule {
}
