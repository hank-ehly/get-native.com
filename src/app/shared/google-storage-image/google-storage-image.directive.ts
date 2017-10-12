import { Directive, ElementRef, Input } from '@angular/core';

import { environment } from '../../../environments/environment';

@Directive({
    selector: '[gnGoogleStorageImage]'
})
export class GoogleStorageImageDirective {

    @Input('gnGoogleStorageImage') set path(path: any) {
        if (this.el.nativeElement.tagName.toLowerCase() === 'img') {
            (<HTMLImageElement>this.el.nativeElement).src = environment.googleStorageUrl + path;
        }
    }

    constructor(private el: ElementRef) {
    }

}
