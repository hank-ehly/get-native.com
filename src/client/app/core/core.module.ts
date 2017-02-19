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
    AuthService,
    CategoryListService,
    LocalStorageService,
    LoginModalService,
    URIService,
    HttpService,
    NavbarService,
    ObjectService,
    PasswordService,
    StringService,
    ToolbarService,
    Logger,
    LangService,
    UTCDateService,
    UserService
} from './index';

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
        AuthGuard,
        AuthService,
        CategoryListService,
        LocalStorageService,
        LoginModalService,
        URIService,
        HttpService,
        NavbarService,
        ObjectService,
        PasswordService,
        StringService,
        ToolbarService,
        Logger,
        LangService,
        UTCDateService,
        UserService
    ]
})
export class CoreModule {
}
