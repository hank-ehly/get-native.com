/**
 * privacy-routing.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/07.
 */

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PrivacyComponent } from './privacy.component';

const privacyRoutes: Routes = [
    {path: 'privacy', component: PrivacyComponent}
];

@NgModule({
    imports: [RouterModule.forChild(privacyRoutes)],
    exports: [RouterModule]
})

export class PrivacyRoutingModule {
}
