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

import { CategoryListComponent } from './category-list/category-list.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { DatePipe } from './date/date.pipe';
import { FooterComponent } from './footer/footer.component';
import { FuzzyNumberPipe } from './fuzzy-number/fuzzy-number.pipe';
import { DigitalTimePipe } from './digital-time/digital-time.pipe';
import { FocusDirective } from './focus/focus.directive';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { SelectComponent } from './select/select.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { StudyProgressComponent } from './study-progress/study-progress.component';
import { SwitchComponent } from './switch/switch.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TranscriptComponent } from './transcript/transcript.component';
import { VideoDirective } from './video/video.directive';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoPanelComponent } from './video-panel/video-panel.component';
import { VideoPanelListComponent } from './video-panel-list/video-panel-list.component';
import { VideoSearchComponent } from './video-search/video-search.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        CategoryListComponent,
        ComplianceComponent,
        DatePipe,
        FooterComponent,
        FuzzyNumberPipe,
        DigitalTimePipe,
        FocusDirective,
        ModalComponent,
        NavbarComponent,
        PasswordStrengthComponent,
        SelectComponent,
        SideMenuComponent,
        StudyProgressComponent,
        SwitchComponent,
        ToolbarComponent,
        TranscriptComponent,
        VideoDirective,
        VideoPlayerComponent,
        VideoPanelComponent,
        VideoPanelListComponent,
        VideoSearchComponent

    ],
    exports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CategoryListComponent,
        ComplianceComponent,
        DatePipe,
        FooterComponent,
        FuzzyNumberPipe,
        DigitalTimePipe,
        FocusDirective,
        ModalComponent,
        NavbarComponent,
        PasswordStrengthComponent,
        SelectComponent,
        SideMenuComponent,
        StudyProgressComponent,
        SwitchComponent,
        ToolbarComponent,
        TranscriptComponent,
        VideoPlayerComponent,
        VideoPanelComponent,
        VideoPanelListComponent,
        VideoSearchComponent
    ]
})

export class SharedModule {
}
