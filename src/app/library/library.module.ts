/**
 * library.module
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { NgModule } from '@angular/core';

import { LibraryComponent } from './library.component';
import { SharedModule } from '../shared/shared.module';
import { LibraryDetailComponent } from './library-detail.component';
import { LibraryDetailResolverService } from './library-detail-resolver.service';

import { AdsenseModule } from 'ng2-adsense';

@NgModule({
    imports: [SharedModule, AdsenseModule.forRoot()],
    declarations: [LibraryComponent, LibraryDetailComponent],
    exports: [LibraryComponent, LibraryDetailComponent],
    providers: [LibraryDetailResolverService]
})
export class LibraryModule {
}
