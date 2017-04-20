/**
 * library.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { NgModule } from '@angular/core';

import { LibraryComponent } from './library.component';
import { SharedModule } from '../shared/shared.module';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryDetailComponent } from './library-detail/library-detail.component';

@NgModule({
    imports: [SharedModule, LibraryRoutingModule],
    declarations: [LibraryComponent, LibraryDetailComponent],
    exports: [LibraryComponent, LibraryDetailComponent]
})
export class LibraryModule {
}
