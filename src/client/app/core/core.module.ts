/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
    ToolbarComponent,
    NavbarComponent,
    SideMenuComponent,
    FooterComponent,
    CookieComplianceComponent,
    LocalStorageService
} from './index';
import { LoginModule } from './login/login.module';

@NgModule({
    imports: [RouterModule, CommonModule, LoginModule],
    declarations: [ToolbarComponent, NavbarComponent, SideMenuComponent, FooterComponent, CookieComplianceComponent],
    exports: [LoginModule, ToolbarComponent, NavbarComponent, SideMenuComponent, FooterComponent, CookieComplianceComponent],
    providers: [LocalStorageService]
})

export class CoreModule {
}
