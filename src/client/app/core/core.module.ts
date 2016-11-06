/**
 * core.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';

import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';

@NgModule({
    declarations: [
        ToolbarComponent,
        NavbarComponent
    ],
    exports: [
        ToolbarComponent,
        NavbarComponent
    ]
})

export class CoreModule {
}
