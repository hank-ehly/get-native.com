/**
 * video.directive
 * get-native.com
 *
 * Created by henryehly on 2016/12/16.
 */

import { Directive, ElementRef } from '@angular/core';

import { Logger } from '../../core/logger/logger';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Directive({
    selector: '[gnVideo]'
})
export class VideoDirective {
    currentTime$: Observable<number>;
    loadedMetadata$: Observable<Event>;
    progress$: Observable<number>;

    private currentTimeSource: Subject<number>;
    private loadedMetadataSource: Subject<Event>;
    private progressSource: Subject<number>;

    private videoEl: HTMLVideoElement;
    private previousStepTime: number;

    constructor(private el: ElementRef, private logger: Logger) {
        this.videoEl = <HTMLVideoElement>el.nativeElement;

        this.currentTimeSource = new Subject<number>();
        this.loadedMetadataSource = new Subject<Event>();
        this.progressSource = new Subject<number>();

        this.currentTime$ = this.currentTimeSource.asObservable();
        this.loadedMetadata$ = this.loadedMetadataSource.asObservable();
        this.progress$ = this.progressSource.asObservable();

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

    set currentTime(time: number) {
        this.videoEl.currentTime = time;
        this.currentTimeSource.next(time);
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
        this.loadedMetadataSource.next(e);
    }

    private onprogress(e: Event): void {
        if (this.videoEl.readyState < this.videoEl.HAVE_CURRENT_DATA) {
            return;
        }

        let endTime = this.videoEl.buffered.end(0);
        let loaded = +(endTime / this.duration).toFixed(2);

        this.progressSource.next(loaded);

        this.logger.debug(this, e.type, loaded);
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
