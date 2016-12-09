/**
 * account.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/09.
 */

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
    imports: [SharedModule, AccountRoutingModule],
    declarations: [AccountComponent],
    exports: [AccountComponent]
})

export class AccountModule {
}
