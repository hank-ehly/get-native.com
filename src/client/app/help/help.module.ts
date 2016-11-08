/**
 * help.module
 * get-native.com
 *
 * Created by henryehly on 2016/11/08.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpComponent } from './index';

@NgModule({
    imports: [CommonModule], // TODO:  do you need to import the common module here even though you're importing it in the AppModule?
    declarations: [HelpComponent],
    exports: [HelpComponent]
})

export class HelpModule {
}
