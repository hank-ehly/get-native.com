/**
 * library.module
 * get-native.com
 *
 * Created by henryehly on 2016/12/05.
 */

import { NgModule } from '@angular/core';

import { LibraryComponent } from './index';

@NgModule({
    declarations: [LibraryComponent],
    exports: [LibraryComponent]
})

export class LibraryModule {
}
