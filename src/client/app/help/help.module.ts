/**
 * help.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { NgModule } from '@angular/core';

import { HelpComponent } from './index';
import { FaqService } from './faq/index';
import { HelpRoutingModule } from './help-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule, HelpRoutingModule],
    declarations: [HelpComponent],
    exports: [HelpComponent],
    providers: [FaqService]
})

export class HelpModule {
}
