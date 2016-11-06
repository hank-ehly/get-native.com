/**
 * home.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule {
}
