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
import { PrivacyPolicyModule } from './privacy-policy/privacy-policy.module';
import { HelpModule } from './help/help.module';
import { TOSModule } from './tos/tos.module';

import { routes } from './app.routes';

@NgModule({
    imports: [BrowserModule, CoreModule, RouterModule.forRoot(routes), HomeModule, PrivacyPolicyModule, HelpModule,
        TOSModule],
    declarations: [AppComponent],
    providers: [{provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'}],
    bootstrap: [AppComponent]
})

export class AppModule {
}
