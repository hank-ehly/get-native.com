/**
 * shared.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/30.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
    ComplianceComponent,
    FooterComponent,
    NavbarComponent,
    SideMenuComponent,
    ToolbarComponent,
    VideoComponent,
    VideoPanelComponent
} from './index';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        ComplianceComponent,
        FooterComponent,
        NavbarComponent,
        SideMenuComponent,
        ToolbarComponent,
        VideoComponent,
        VideoPanelComponent
    ],
    exports: [
        CommonModule,
        RouterModule,
        ComplianceComponent,
        FooterComponent,
        NavbarComponent,
        SideMenuComponent,
        ToolbarComponent,
        VideoComponent,
        VideoPanelComponent
    ]
})

export class SharedModule {
}

