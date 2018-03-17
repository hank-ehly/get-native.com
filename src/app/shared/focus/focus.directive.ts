/**
 * focus.directive
 * getnative.org
 *
 * Created by henryehly on 2017/02/05.
 */

import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[gnFocus]'
})
export class FocusDirective {

    @Input('gnFocus') set focus(focus: any) {
        this.el.nativeElement.focus();
    }

    constructor(private el: ElementRef) {
    }

}
