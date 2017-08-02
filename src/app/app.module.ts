/**
 * app.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { metaFactory } from './meta-factory';

import { MetaModule, MetaLoader } from '@ngx-meta/core';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MetaModule.forRoot({
            provide: MetaLoader,
            useFactory: (metaFactory)
        }),
        CoreModule,
        SharedModule,
        DashboardModule,
        LoginModule,
        LibraryModule,
        SettingsModule,
        StudyModule,
        StaticPagesModule,
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {provide: LogLevelToken, useValue: LogLevelValue.DEBUG},
        Logger
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
