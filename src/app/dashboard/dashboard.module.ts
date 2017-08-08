/**
 * dashboard.module
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/28.
 */

import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { StatsComponent } from './stats/stats.component';
import { DashboardResolveService } from './dashboard-resolve.service';
import { DashboardGuard } from './dashboard-guard.service';

@NgModule({
    imports: [SharedModule],
    declarations: [DashboardComponent, StatsComponent],
    exports: [DashboardComponent],
    providers: [DashboardResolveService, DashboardGuard]
})
export class DashboardModule {
}
