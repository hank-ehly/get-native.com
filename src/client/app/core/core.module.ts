/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';
import { SideMenuComponent } from './side-menu/index';
import { FooterComponent } from './footer/index';
import { CookieComplianceComponent } from './cookie-compliance/index';

@NgModule({
    imports: [RouterModule],
    declarations: [ToolbarComponent, NavbarComponent, SideMenuComponent, FooterComponent, CookieComplianceComponent],
    exports: [ToolbarComponent, NavbarComponent, SideMenuComponent, FooterComponent, CookieComplianceComponent]
})

export class CoreModule {
}
