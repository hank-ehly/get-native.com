/**
 * settings-routing.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

const settingsRoutes: Routes = [
    {path: 'settings', component: SettingsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(settingsRoutes)],
    exports: [RouterModule]
})

export class SettingsRoutingModule {
}
