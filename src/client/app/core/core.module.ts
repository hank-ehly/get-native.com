/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';

import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';
import { SideMenuComponent } from './side-menu/index';
import { FooterComponent } from './footer/index';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule],
    declarations: [ToolbarComponent, NavbarComponent, SideMenuComponent, FooterComponent],
    exports: [ToolbarComponent, NavbarComponent, SideMenuComponent, FooterComponent]
})

export class CoreModule {
}
