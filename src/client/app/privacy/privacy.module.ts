/**
 * privacy.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/07.
 */

import { NgModule } from '@angular/core';

import { PrivacyComponent } from './index';
import { PrivacyRoutingModule } from './privacy-routing.module';

@NgModule({
    imports: [PrivacyRoutingModule],
    declarations: [PrivacyComponent],
    exports: [PrivacyComponent]
})

export class PrivacyModule {
}
