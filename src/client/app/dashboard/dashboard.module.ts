/**
 * dashboard.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StatsComponent } from './stats/stats.component';

@NgModule({
    imports: [SharedModule, DashboardRoutingModule],
    declarations: [DashboardComponent, StatsComponent],
    exports: [DashboardComponent]
})

export class DashboardModule {
}
