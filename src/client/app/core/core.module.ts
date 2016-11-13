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
    ToolbarComponent, NavbarComponent, SideMenuComponent, FooterComponent, CookieComplianceComponent, LoginComponent
} from './index';

@NgModule({
    imports: [RouterModule, CommonModule],
    declarations: [ToolbarComponent, NavbarComponent, SideMenuComponent, FooterComponent, CookieComplianceComponent, LoginComponent],
    exports: [ToolbarComponent, NavbarComponent, SideMenuComponent, FooterComponent, CookieComplianceComponent, LoginComponent]
})

export class CoreModule {
}
