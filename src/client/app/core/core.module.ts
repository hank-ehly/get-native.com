/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {
    LocalStorageService,
    LoginService,
    MockHTTPClient,
    NavbarService,
    PasswordService,
    StringService,
    HighResTimestampService,
    Logger,
    LangService
} from './index';

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
        LocalStorageService,
        LoginService,
        MockHTTPClient,
        NavbarService,
        PasswordService,
        StringService,
        HighResTimestampService,
        Logger,
        LangService
    ]
})
export class CoreModule {
}
