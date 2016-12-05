/**
 * library-detail.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { NgModule } from '@angular/core';

import { LibraryDetailComponent } from './library-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    exports: [LibraryDetailComponent],
    declarations: [LibraryDetailComponent]
})

export class LibraryDetailModule {
}
