/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';

import {
    LocalStorageService,
    LoginService,
    NavbarService,
    PasswordService,
    StringService,
    TimeFormatService,
    Logger
} from './index';

@NgModule({
    providers: [
        LocalStorageService,
        LoginService,
        NavbarService,
        PasswordService,
        StringService,
        TimeFormatService,
        Logger
    ]
})

export class CoreModule {
}
