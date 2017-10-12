/**
 * video.directive
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/16.
 */

import { Directive, ElementRef, Input } from '@angular/core';

import { UnitInterval } from '../../core/typings/unit-interval';
import { Logger } from '../../core/logger/logger';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Directive({
    selector: '[gnVideo]'
})
export class VideoDirective {

    currentTimeEmitted$: Observable<UnitInterval>;
    loadedMetadataEmitted$: Observable<Event>;

    private currentTimeSource: Subject<UnitInterval>;
    private loadedMetadataSource: Subject<Event>;
    private progressSource: BehaviorSubject<number>;

    private videoEl: HTMLVideoElement;
    private previousStepTime: number;

    constructor(private el: ElementRef, private logger: Logger) {
        this.videoEl = <HTMLVideoElement>el.nativeElement;

        this.currentTimeSource = new Subject<number>();
        this.loadedMetadataSource = new Subject<Event>();
        this.progressSource = new BehaviorSubject<number>(0);

        this.currentTimeEmitted$ = this.currentTimeSource.asObservable();
        this.loadedMetadataEmitted$ = this.loadedMetadataSource.asObservable();

        this.videoEl.onloadedmetadata = this.onLoadedMetadata.bind(this);
        this.videoEl.onprogress = this.onProgress.bind(this);
        this.videoEl.onloadeddata = this.onProgress.bind(this);
        this.videoEl.onplay = this.onPlay.bind(this);
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

    get progress(): Observable<number> {
        return this.progressSource.asObservable();
    }

    set currentTime(time: number) {
        this.videoEl.currentTime = time;
        this.currentTimeSource.next(time);
    }

    set volume(value: number) {
        this.videoEl.volume = value;
    }

    play(): void {
        this.videoEl.play();
    }

    pause(): void {
        this.videoEl.pause();
    }

    private onLoadedMetadata(e: Event): void {
        this.loadedMetadataSource.next(e);
    }

    private onProgress(e: Event): void {
        if (this.videoEl.readyState < this.videoEl.HAVE_FUTURE_DATA) {
            return;
        }

        const endTime = this.videoEl.buffered.end(0);
        const loaded = +(endTime / this.duration).toFixed(2);

        this.progressSource.next(loaded);
        this.logger.debug(this, e.type, loaded);
    }

    private onPlay(e: Event): void {
        this.triggerAnimationLoop();
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

        const progress = time - this.previousStepTime;
        const minStepProgress = 30;

        return progress >= minStepProgress;
    }

    private render(): void {
        this.currentTimeSource.next(this.currentTime);
    }

}
