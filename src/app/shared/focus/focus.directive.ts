/**
 * focus.directive
 * get-native.com
 *
 * Created by henryehly on 2017/02/05.
 */

import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[gnFocus]'
})
export class FocusDirective {
    @Input('gnFocus') set focused(focus: boolean) {
        if (focus) {
            this.el.nativeElement.focus();
        }
    }

    constructor(private el: ElementRef) {
    }
}
