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
    ModalComponent,
    NavbarComponent,
    SideMenuComponent,
    StudyProgressComponent,
    SwitchComponent,
    ToolbarComponent,
    TranscriptComponent,
    VideoDirective,
    VideoPlayerComponent,
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
        ModalComponent,
        NavbarComponent,
        SideMenuComponent,
        StudyProgressComponent,
        SwitchComponent,
        ToolbarComponent,
        TranscriptComponent,
        VideoDirective,
        VideoPlayerComponent,
        VideoPanelComponent
    ],
    exports: [
        CommonModule,
        RouterModule,
        ComplianceComponent,
        FooterComponent,
        ModalComponent,
        NavbarComponent,
        SideMenuComponent,
        StudyProgressComponent,
        SwitchComponent,
        ToolbarComponent,
        TranscriptComponent,
        VideoPlayerComponent,
        VideoPanelComponent
    ]
})

export class SharedModule {
}

