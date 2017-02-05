/**
 * focus.directive
 * get-native.com
 *
 * Created by henryehly on 2017/02/05.
 */

import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[gnFocus]'
})
export class FocusDirective {
    constructor(private el: ElementRef) {
    }

    focus(): void {
        this.el.nativeElement.focus();
    }
}
