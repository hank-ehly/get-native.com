/**
 * help-routing.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HelpComponent } from './help.component';

const helpRoutes: Routes = [
    {path: 'help', component: HelpComponent}
];

@NgModule({
    imports: [RouterModule.forChild(helpRoutes)],
    exports: [RouterModule]
})

export class HelpRoutingModule {
}
