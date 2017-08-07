/**
 * static-pages.module
 * get-native.com
 *
 * Created by henryehly on 2017/04/21.
 */

import { NgModule } from '@angular/core';

import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TOSComponent } from './tos/tos.component';
import { SharedModule } from '../shared/shared.module';
import { MobileOverlayComponent } from './mobile-overlay/mobile-overlay.component';

@NgModule({
    imports: [SharedModule],
    exports: [HelpComponent, HomeComponent, PageNotFoundComponent, PrivacyComponent, TOSComponent, MobileOverlayComponent],
    declarations: [HelpComponent, HomeComponent, PageNotFoundComponent, PrivacyComponent, TOSComponent, MobileOverlayComponent],
})
export class StaticPagesModule {
}

