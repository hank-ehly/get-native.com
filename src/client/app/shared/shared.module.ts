/**
 * shared.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/30.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    ComplianceComponent,
    FooterComponent,
    NavbarComponent,
    SideMenuComponent,
    ToolbarComponent,
    VideoPanelComponent
} from './index';
import { LoginModule } from './login/login.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        LoginModule
    ],
    declarations: [
        ComplianceComponent,
        FooterComponent,
        NavbarComponent,
        SideMenuComponent,
        ToolbarComponent,
        VideoPanelComponent
    ],
    exports: [
        CommonModule,
        RouterModule,
        LoginModule,
        ComplianceComponent,
        FooterComponent,
        NavbarComponent,
        SideMenuComponent,
        ToolbarComponent,
        VideoPanelComponent
    ]
})

export class SharedModule {
}

