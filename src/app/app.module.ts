/**
 * app.module
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LibraryModule } from './library/library.module';
import { AppRoutingModule } from './app-routing.module';
import { SettingsModule } from './settings/settings.module';
import { StudyModule } from './study/study.module';
import { LogLevelToken, LogLevelValue } from './core/logger/log-level';
import { Logger } from './core/logger/logger';
import { StaticPagesModule } from './static-pages/static-pages.module';
import { LangService } from './core/lang/lang.service';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { HelpModule } from './help/help.module';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'gn-app'}),
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        DashboardModule,
        LoginModule,
        LibraryModule,
        SettingsModule,
        StudyModule,
        StaticPagesModule,
        HelpModule,
        PasswordResetModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {provide: LogLevelToken, useValue: environment.production ? LogLevelValue.OFF : LogLevelValue.DEBUG},
        Logger
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
