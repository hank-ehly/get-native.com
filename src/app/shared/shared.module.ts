/**
 * shared.module
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/30.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AutosizeTextareaDirective } from './autosize-textarea/autosize-textarea.directive';
import { CategoryListComponent } from './category-list/category-list.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { DatePipe } from './date/date.pipe';
import { FooterComponent } from './footer/footer.component';
import { FuzzyNumberPipe } from './fuzzy-number/fuzzy-number.pipe';
import { MatchDirective } from './match/match.directive';
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
import { SafeHtmlPipe } from './safe-html/safe-html.pipe';
import { ActivityDropdownComponent } from './navbar/activity-dropdown.component';
import { FromNowPipe } from './from-now/from-now.pipe';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        AutosizeTextareaDirective,
        CategoryListComponent,
        ComplianceComponent,
        DatePipe,
        FooterComponent,
        FuzzyNumberPipe,
        MatchDirective,
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
        VideoSearchComponent,
        SafeHtmlPipe,
        ActivityDropdownComponent,
        FromNowPipe,
        ImageCropperComponent,
        DropdownComponent

    ],
    exports: [
        AutosizeTextareaDirective,
        CommonModule,
        RouterModule,
        FormsModule,
        CategoryListComponent,
        ComplianceComponent,
        DatePipe,
        FooterComponent,
        FuzzyNumberPipe,
        MatchDirective,
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
        VideoSearchComponent,
        SafeHtmlPipe,
        ActivityDropdownComponent,
        FromNowPipe,
        ImageCropperComponent,
        DropdownComponent
    ]
})
export class SharedModule {
}
