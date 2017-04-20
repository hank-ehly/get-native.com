/**
 * static-pages.module
 * get-native.com
 *
 * Created by henryehly on 2017/04/21.
 */

import { NgModule } from '@angular/core';

import { StaticPagesRoutingModule } from './static-pages-routing.module';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TOSComponent } from './tos/tos.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule, StaticPagesRoutingModule],
    exports: [HelpComponent, HomeComponent, PageNotFoundComponent, PrivacyComponent, TOSComponent],
    declarations: [HelpComponent, HomeComponent, PageNotFoundComponent, PrivacyComponent, TOSComponent],
})
export class StaticPagesModule {
}

