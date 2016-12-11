/**
 * study-routing.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/11.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudyComponent } from './study.component';

const studyRoutes: Routes = [
    {path: 'study', component: StudyComponent}
];

@NgModule({
    imports: [RouterModule.forChild(studyRoutes)],
    exports: [RouterModule]
})
export class StudyRoutingModule {
}
