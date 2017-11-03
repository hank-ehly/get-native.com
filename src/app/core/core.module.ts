/**
 * core.module
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './auth/auth-guard.service';
import { CategoryListService } from './category-list/category-list.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { LoginModalService } from './login-modal/login-modal.service';
import { URIService } from './http/uri.service';
import { HttpService } from './http/http.service';
import { NavbarService } from './navbar/navbar.service';
import { PasswordService } from './password/password.service';
import { StringService } from './string/string.service';
import { Logger } from './logger/logger';
import { LangService } from './lang/lang.service';
import { UTCDateService } from './utc-date/utc-date.service';
import { UserService } from './user/user.service';
import { ConfirmEmailResolver } from './auth/confirm-email-resolver.service';
import { StudySessionService } from './study-session/study-session.service';
import { WordCountService } from './word-count/word-count.service';
import { ConfirmEmailUpdateResolver } from './auth/confirm-email-update-resolver.service';
import { FacebookService } from './facebook/facebook.service';
import { DOMService } from './dom/dom.service';
import { ImageService } from './image.service';
import { NotificationService } from './notification/notification.service';
import { OAuthGuard } from './auth/oauth.guard';
import { GoogleAnalyticsEventsService } from './google-analytics-events.service';
import { GlobalErrorHandler } from './global-error-handler';

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
        PasswordService,
        StringService,
        Logger,
        LangService,
        UTCDateService,
        UserService,
        ConfirmEmailResolver,
        ConfirmEmailUpdateResolver,
        StudySessionService,
        WordCountService,
        FacebookService,
        DOMService,
        ImageService,
        NotificationService,
        OAuthGuard,
        GoogleAnalyticsEventsService,
        // {provide: ErrorHandler, useClass: GlobalErrorHandler}
    ]
})
export class CoreModule {
}
