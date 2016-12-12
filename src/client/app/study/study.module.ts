/**
 * study.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { NgModule } from '@angular/core';

import { SharedModule }       from '../shared/shared.module';
import { StudyRoutingModule } from './study-routing.module';
import { StudyComponent }     from './study.component';
import { ListeningComponent } from './listening/listening.component';
import { ShadowingComponent } from './shadowing/shadowing.component';
import { SpeakingComponent }  from './speaking/speaking.component';
import { WritingComponent }   from './writing/writing.component';
import { ResultsComponent }   from './results/results.component';
import { TransitionComponent } from './transition/transition.component';

@NgModule({
    imports: [
        SharedModule,
        StudyRoutingModule
    ],
    declarations: [
        StudyComponent,
        ListeningComponent,
        ShadowingComponent,
        SpeakingComponent,
        WritingComponent,
        ResultsComponent,
        TransitionComponent
    ]
})
export class StudyModule {
}
