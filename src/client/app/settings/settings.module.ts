/**
 * settings.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { SecurityComponent } from './security/security.component';
import { GeneralComponent } from './general/general.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
    imports: [SharedModule],
    declarations: [SettingsComponent, SecurityComponent, GeneralComponent, NotificationsComponent],
    exports: [SettingsComponent]
})

export class SettingsModule {
}
