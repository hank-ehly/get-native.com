/**
 * dashboard.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { StatsComponent } from './stats/stats.component';

@NgModule({
    imports: [SharedModule],
    declarations: [DashboardComponent, StatsComponent],
    exports: [DashboardComponent]
})
export class DashboardModule {
}
