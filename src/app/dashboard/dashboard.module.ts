/**
 * dashboard.module
 * getnative.org
 *
 * Created by henryehly on 2016/11/28.
 */

import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { StatsComponent } from './stats/stats.component';
import { DashboardGuard } from './dashboard-guard.service';

@NgModule({
    imports: [SharedModule],
    declarations: [DashboardComponent, StatsComponent],
    exports: [DashboardComponent],
    providers: [DashboardGuard]
})
export class DashboardModule {
}
