/**
 * video.directive
 * get-native.com
 *
 * Created by henryehly on 2016/12/16.
 */

import { Directive, ElementRef } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Logger } from 'angular2-logger/core';

@Directive({
    selector: '[gnVideo]'
})
export class VideoDirective {
    currentTime$: Observable<number>;
    metadata$: Observable<Event>;
    load$: Observable<number>;

    private currentTimeSource: Subject<number>;
    private metadataSource: Subject<Event>;
    private loadSource: Subject<number>;

    private videoEl: HTMLVideoElement;
    private previousStepTime: number;

    constructor(private el: ElementRef, private logger: Logger) {
        this.videoEl = <HTMLVideoElement>el.nativeElement;

        this.currentTimeSource = new Subject<number>();
        this.metadataSource = new Subject<Event>();
        this.loadSource = new Subject<number>();

        this.currentTime$ = this.currentTimeSource.asObservable();
        this.metadata$ = this.metadataSource.asObservable();
        this.load$ = this.loadSource.asObservable();

        this.videoEl.onloadedmetadata = this.onloadedmetadata.bind(this);
        this.videoEl.onprogress = this.onprogress.bind(this);
        this.videoEl.onloadeddata = this.onprogress.bind(this);
    }

    get paused(): boolean {
        return this.videoEl.paused;
    }

    get currentTime(): number {
        return this.videoEl.currentTime;
    }

    get duration(): number {
        return this.videoEl.duration;
    }

    get volume(): number {
        return this.videoEl.volume;
    }

    set volume(value: number) {
        this.videoEl.volume = value;
    }

    play(): void {
        this.videoEl.play();
        this.triggerAnimationLoop();
    }

    pause(): void {
        this.videoEl.pause();
    }

    private onloadedmetadata(e: Event): void {
        this.metadataSource.next(e);
    }

    private onprogress(e: Event): void {
        if (this.videoEl.readyState < 2) {
            return;
        }

        let endTime = this.videoEl.buffered.end(0);
        let loaded = +(endTime / this.duration).toFixed(2);

        this.loadSource.next(loaded);
    }

    private triggerAnimationLoop(): void {
        requestAnimationFrame(this.step.bind(this));
    }

    private step(time: number): void {
        if (!this.shouldRender(time)) {
            return this.triggerAnimationLoop();
        }

        this.previousStepTime = time;
        this.render();

        if (!this.paused) {
            return this.triggerAnimationLoop();
        }
    }

    private shouldRender(time: number): boolean {
        if (!this.previousStepTime) {
            this.previousStepTime = time;
        }

        let progress = time - this.previousStepTime;
        let minStepProgress = 50;

        return progress >= minStepProgress;
    }

    private render(): void {
        this.currentTimeSource.next(this.currentTime);
    }
}
