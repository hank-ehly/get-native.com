/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';

import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        ToolbarComponent,
        NavbarComponent,
        SideMenuComponent,
        FooterComponent
    ],
    exports: [
        ToolbarComponent,
        NavbarComponent,
        SideMenuComponent,
        FooterComponent
    ]
})

export class CoreModule {
}
