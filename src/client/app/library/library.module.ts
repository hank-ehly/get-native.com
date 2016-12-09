/**
 * library.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { NgModule } from '@angular/core';

import { LibraryComponent } from './index';
import { SharedModule } from '../shared/shared.module';
import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
    imports: [SharedModule, LibraryRoutingModule],
    declarations: [LibraryComponent],
    exports: [LibraryComponent]
})

export class LibraryModule {
}
