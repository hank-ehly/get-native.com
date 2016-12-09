/**
 * account-routing.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';

const accountRoutes: Routes = [
    {path: 'account', component: AccountComponent}
];

@NgModule({
    imports: [RouterModule.forChild(accountRoutes)],
    exports: [RouterModule]
})

export class AccountRoutingModule {
}
