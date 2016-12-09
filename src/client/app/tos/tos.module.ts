/**
 * tos.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/10.
 */

import { NgModule } from '@angular/core';

import { TOSComponent } from './index';
import { TOSRoutingModule } from './tos-routing.module';

@NgModule({
    imports: [TOSRoutingModule],
    declarations: [TOSComponent],
    exports: [TOSComponent]
})

export class TOSModule {
}
