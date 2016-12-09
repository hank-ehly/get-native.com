/**
 * settings.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
    imports: [SharedModule, SettingsRoutingModule],
    declarations: [SettingsComponent],
    exports: [SettingsComponent]
})

export class SettingsModule {
}
