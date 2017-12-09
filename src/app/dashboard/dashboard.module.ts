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
import { DashboardGuard } from './dashboard-guard.service';

import { TourNgxBootstrapModule } from 'ngx-tour-ngx-bootstrap';

@NgModule({
    imports: [SharedModule, TourNgxBootstrapModule.forRoot()],
    declarations: [DashboardComponent, StatsComponent],
    exports: [DashboardComponent],
    providers: [DashboardGuard]
})
export class DashboardModule {
}
