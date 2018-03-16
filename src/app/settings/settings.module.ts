/**
 * settings.module
 * getnative.org
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
import { CropperModalComponent } from './cropper-modal/cropper-modal.component';
import { CropperModalService } from './cropper-modal/cropper-modal.service';

import { ImageCropperModule } from 'ng2-img-cropper';

@NgModule({
    imports: [SharedModule, ImageCropperModule],
    declarations: [
        SettingsComponent, SecurityComponent, GeneralComponent, NotificationsComponent, ActivityComponent, CropperModalComponent],
    exports: [SettingsComponent],
    providers: [CropperModalService],
    entryComponents: [CropperModalComponent]
})

export class SettingsModule {
}
