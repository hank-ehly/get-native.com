/**
 * video.directive
 * get-native.com
 *
 * Created by henryehly on 2016/12/16.
 */

import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[gnVideo]'
})

export class VideoDirective {
    videoEl: HTMLVideoElement;

    constructor(private el: ElementRef) {
        this.videoEl = <HTMLVideoElement>el.nativeElement;
    }

    get paused(): boolean {
        return this.videoEl.paused;
    }

    play(): void {
        this.videoEl.play();
    }

    pause(): void {
        this.videoEl.pause();
    }
}
