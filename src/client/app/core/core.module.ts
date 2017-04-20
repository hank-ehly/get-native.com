/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './auth/auth-guard.service';
import { CategoryListService } from './category-list/category-list.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { LoginModalService } from './login-modal/login-modal.service';
import { URIService } from './http/uri.service';
import { HttpService } from './http/http.service';
import { NavbarService } from './navbar/navbar.service';
import { ObjectService } from './object/object.service';
import { PasswordService } from './password/password.service';
import { StringService } from './string/string.service';
import { Logger } from './logger/logger';
import { LangService } from './lang/lang.service';
import { UTCDateService } from './utc-date/utc-date.service';
import { UserService } from './user/user.service';
import { ConfirmEmailResolver } from './auth/confirm-email-resolver.service';

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
        AuthGuard,
        CategoryListService,
        LocalStorageService,
        LoginModalService,
        URIService,
        HttpService,
        NavbarService,
        ObjectService,
        PasswordService,
        StringService,
        Logger,
        LangService,
        UTCDateService,
        UserService,
        ConfirmEmailResolver
    ]
})
export class CoreModule {
}
