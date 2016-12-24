/**
 * tos-routing.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/10.
 */

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TOSComponent } from './tos.component';

const tosRoutes: Routes = [
    {path: 'tos', component: TOSComponent, data: {title: 'Terms of Service'}}
];

@NgModule({
    imports: [RouterModule.forChild(tosRoutes)],
    exports: [RouterModule]
})

export class TOSRoutingModule {
}
