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
    imports: [CommonModule], // TODO:  do you need to import the common module here even though you're importing it in the AppModule?
    declarations: [HomeComponent],
    exports: [HomeComponent],
    providers: [FeatureDescriptionService]
})

export class HomeModule {
}
