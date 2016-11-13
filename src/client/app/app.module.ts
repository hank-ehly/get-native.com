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
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { PrivacyModule } from './privacy/privacy.module';
import { HelpModule } from './help/help.module';
import { TOSModule } from './tos/tos.module';

import { routes } from './app.routes';
import { Options as LoggerOptions, Logger, Level as LoggerLevel } from 'angular2-logger/core';

@NgModule({
    imports: [BrowserModule, CoreModule, RouterModule.forRoot(routes), HomeModule, PrivacyModule, HelpModule, TOSModule],
    declarations: [AppComponent],
    providers: [
        {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'},
        {
            provide: LoggerOptions,
            useValue: {level: String('<%= BUILD_TYPE %>') === 'prod' ? LoggerLevel.OFF : LoggerLevel.LOG}
        }, Logger],
    bootstrap: [AppComponent]
})

export class AppModule {
}
