/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {
    AuthGuard,
    LocalStorageService,
    LoginService,
    MockHTTPClient,
    NavbarService,
    PasswordService,
    StringService,
    HighResTimestampService,
    Logger,
    LangService,
    UTCDateService
} from './index';

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
        AuthGuard,
        LocalStorageService,
        LoginService,
        MockHTTPClient,
        NavbarService,
        PasswordService,
        StringService,
        HighResTimestampService,
        Logger,
        LangService,
        UTCDateService
    ]
})
export class CoreModule {
}
