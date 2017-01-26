/**
 * app.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { PrivacyModule } from './privacy/privacy.module';
import { HelpModule } from './help/help.module';
import { TOSModule } from './tos/tos.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LibraryModule } from './library/library.module';
import { LibraryDetailModule } from './library-detail/library-detail.module';
import { AppRoutingModule } from './app-routing.module';
import { SettingsModule } from './settings/settings.module';
import { StudyModule } from './study/study.module';
import { Logger, LoggerConfig, LOG_LEVEL } from './core/index';
import { Config } from './shared/config/env.config';

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        AppRoutingModule,
        SharedModule,
        HomeModule,
        PrivacyModule,
        HelpModule,
        TOSModule,
        DashboardModule,
        LoginModule,
        LibraryModule,
        LibraryDetailModule,
        SettingsModule,
        StudyModule
    ],
    declarations: [AppComponent],
    providers: [
        {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'},
        {provide: LoggerConfig, useValue: (Config.ENV === 'DEV' ? LOG_LEVEL.DEBUG : LOG_LEVEL.OFF)},
        Logger
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
