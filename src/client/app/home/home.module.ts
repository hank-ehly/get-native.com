/**
 * home.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './index';
import { FeatureDescriptionService } from './feature-description/index';

@NgModule({
    imports: [CommonModule],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    providers: [FeatureDescriptionService]
})

export class HomeModule {
}
