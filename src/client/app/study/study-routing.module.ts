/**
 * study-routing.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudyComponent } from './study.component';
import { TransitionComponent } from './transition/transition.component';
import { ListeningComponent } from './listening/listening.component';
import { ShadowingComponent } from './shadowing/shadowing.component';
import { SpeakingComponent } from './speaking/speaking.component';
import { WritingComponent } from './writing/writing.component';
import { ResultsComponent } from './results/results.component';

const studyRoutes: Routes = [
    {path: 'study', component: StudyComponent, children: [
        {path: '', component: TransitionComponent},
        {path: 'listening', component: ListeningComponent, data: {title: 'Listening'}},
        {path: 'shadowing', component: ShadowingComponent, data: {title: 'Shadowing'}},
        {path: 'speaking', component: SpeakingComponent, data: {title: 'Speaking'}},
        {path: 'writing', component: WritingComponent, data: {title: 'Writing'}},
        {path: 'results', component: ResultsComponent, data: {title: 'Results'}}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(studyRoutes)],
    exports: [RouterModule]
})
export class StudyRoutingModule {
}
