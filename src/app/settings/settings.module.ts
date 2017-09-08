/**
 * settings.module
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { SecurityComponent } from './security/security.component';
import { GeneralComponent } from './general/general.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ActivityComponent } from './activity/activity.component';
import { ImageCropperModule } from 'ng2-img-cropper';

@NgModule({
    imports: [SharedModule, ImageCropperModule],
    declarations: [SettingsComponent, SecurityComponent, GeneralComponent, NotificationsComponent, ActivityComponent],
    exports: [SettingsComponent]
})

export class SettingsModule {
}
