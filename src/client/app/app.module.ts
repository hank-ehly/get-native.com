/**
 * app.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';

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
import { routes } from './app.routes';

import { Options as LoggerOptions, Logger, Level as LoggerLevel } from 'angular2-logger/core';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        CoreModule,
        SharedModule,
        HomeModule,
        PrivacyModule,
        HelpModule,
        TOSModule,
        DashboardModule,
        LoginModule,
        LibraryModule,
        LibraryDetailModule
    ],
    declarations: [AppComponent],
    providers: [
        {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'},
        {provide: LoggerOptions, useValue: {level: LoggerLevel.LOG}},
        Logger
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
