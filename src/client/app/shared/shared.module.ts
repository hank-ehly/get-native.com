/**
 * shared.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/30.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
    ComplianceComponent,
    FooterComponent,
    FuzzyNumberPipe,
    DigitalTimePipe,
    ModalComponent,
    NavbarComponent,
    PasswordStrengthComponent,
    SideMenuComponent,
    StudyProgressComponent,
    SwitchComponent,
    ToolbarComponent,
    TranscriptComponent,
    VideoDirective,
    VideoPlayerComponent,
    VideoPanelComponent,
    VideoPanelListComponent,
    DebugComponent,
    DraggableDirective
} from './index';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        ComplianceComponent,
        FooterComponent,
        FuzzyNumberPipe,
        DigitalTimePipe,
        ModalComponent,
        NavbarComponent,
        PasswordStrengthComponent,
        SideMenuComponent,
        StudyProgressComponent,
        SwitchComponent,
        ToolbarComponent,
        TranscriptComponent,
        VideoDirective,
        VideoPlayerComponent,
        VideoPanelComponent,
        VideoPanelListComponent,
        DebugComponent,
        DraggableDirective
    ],
    exports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ComplianceComponent,
        FooterComponent,
        FuzzyNumberPipe,
        DigitalTimePipe,
        ModalComponent,
        NavbarComponent,
        PasswordStrengthComponent,
        SideMenuComponent,
        StudyProgressComponent,
        SwitchComponent,
        ToolbarComponent,
        TranscriptComponent,
        VideoPlayerComponent,
        VideoPanelComponent,
        VideoPanelListComponent,
        DebugComponent
    ]
})

export class SharedModule {
}
