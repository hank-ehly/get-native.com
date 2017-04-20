/**
 * home-routing.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../core/auth/auth-guard.service';

const homeRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: HomeComponent,
        data: {
            title: 'Home'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
