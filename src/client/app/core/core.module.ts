/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginModule } from './login/login.module';
import {
    ToolbarComponent,
    NavbarComponent,
    SideMenuComponent,
    FooterComponent,
    CookieComplianceComponent,
    LocalStorageService,
    StringService
} from './index';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        LoginModule
    ],
    declarations: [
        ToolbarComponent,
        NavbarComponent,
        SideMenuComponent,
        FooterComponent,
        CookieComplianceComponent
    ],
    exports: [
        LoginModule,
        ToolbarComponent,
        NavbarComponent,
        SideMenuComponent,
        FooterComponent,
        CookieComplianceComponent
    ],
    providers: [
        LocalStorageService,
        StringService
    ]
})

export class CoreModule {
}
