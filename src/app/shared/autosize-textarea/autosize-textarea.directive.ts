/**
 * autosize-textarea.directive
 * getnativelearning.com
 *
 * Created by henryehly on 2017/05/04.
 */

import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { Logger } from '../../core/logger/logger';

@Directive({
    selector: '[gnAutosizeTextarea]'
})
export class AutosizeTextareaDirective implements AfterViewInit {
    constructor(private el: ElementRef, private logger: Logger) {
    }

    ngAfterViewInit(): void {
        this.logger.debug(this, 'AfterViewInit');
        this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';
    }
}
