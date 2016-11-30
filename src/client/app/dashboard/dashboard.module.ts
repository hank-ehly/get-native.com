/**
 * dashboard.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { NgModule } from '@angular/core';

import { DashboardComponent } from './index';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [DashboardComponent],
    exports: [DashboardComponent]
})

export class DashboardModule {
}
