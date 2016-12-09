/**
 * dashboard.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { NgModule } from '@angular/core';

import { DashboardComponent } from './index';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule, DashboardRoutingModule],
    declarations: [DashboardComponent],
    exports: [DashboardComponent]
})

export class DashboardModule {
}
