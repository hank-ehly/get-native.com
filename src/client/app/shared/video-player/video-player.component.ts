/**
 * video-player.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/07.
 */

import { Component, OnInit, ViewChild, AfterViewInit, trigger, animate, style, transition } from '@angular/core';

import { VideoDirective } from '../video/video.directive';
import { TimeFormatService } from '../../core/index';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-video-player',
    templateUrl: 'video-player.component.html',
    styleUrls: ['video-player.component.css'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({opacity: 0}), animate(200, style({opacity: 1}))
            ]),
            transition(':leave', [
                animate(200, style({opacity: 0}))
            ])
        ])
    ]
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
    @ViewChild(VideoDirective) player: VideoDirective;

    currentTimeString: string;
    durationString: string;
    tooltipHidden: boolean;
    controlsHidden: boolean;

    /* Todo: when you click outside the 'already loaded' area, the progress stops updating correctly (seemingly) */
    progressPercent: number;
    currentTimePercent: number;

    private tooltipTimeout: NodeJS.Timer;
    private previousVolume: number;
    private tooltipHasFocus: boolean;

    constructor(private logger: Logger, private timeFormatService: TimeFormatService) {
        this.currentTimeString = this.durationString = '0:00';
        this.progressPercent = 0;
        this.currentTimePercent = 0;
        this.controlsHidden = false;
        this.tooltipHidden = true;
    }

    ngOnInit(): void {
        this.logger.info(`[${this.constructor.name}] ngOnInit()`);
    }

    ngAfterViewInit(): void {
        this.player.currentTime$.subscribe(this.onCurrentTime.bind(this));
        this.player.loadedMetadata$.subscribe(this.onLoadedMetadata.bind(this));
        this.player.progress$.subscribe(this.onProgress.bind(this));
    }

    onClickToggleButton(): void {
        this.togglePlayback();
    }

    onMouseEnterPlayerFrame(): void {
        this.controlsHidden = false;
    }

    onMouseLeavePlayerFrame(): void {
        this.tooltipHidden = true;

        if (!this.player.paused) {
            this.controlsHidden = true;
        }
    }

    onClickVolumeControl(e: MouseEvent): void {
        if (!['volume-control', 'volume-control__icon'].includes((<HTMLElement>e.target).className)) {
            return;
        }

        if (this.player.volume > 0) {
            this.previousVolume = this.player.volume;
            this.player.volume = 0;
        } else if (this.previousVolume) {
            this.player.volume = this.previousVolume;
        } else {
            this.player.volume = 1;
        }
    }

    onMouseEnterVolumeControl(): void {
        this.showTooltip();
    }

    onMouseLeaveVolumeControl(): void {
        this.hideTooltip();
    }

    onMouseDownVolumeTooltip(e: MouseEvent, bar: HTMLElement): void {
        this.updatePlayerVolumeForMouseEvent(e, bar);
        this.tooltipHasFocus = true;
    }

    onMouseMoveVolumeTooltip(e: MouseEvent, bar: HTMLElement): void {
        if (!this.tooltipHasFocus) {
            return;
        }

        this.updatePlayerVolumeForMouseEvent(e, bar);
    }

    onMouseUpVolumeTooltip(e: MouseEvent, bar: HTMLElement): void {
        this.updatePlayerVolumeForMouseEvent(e, bar);
        this.tooltipHasFocus = false;
    }

    onMouseLeaveVolumeTooltip(e: MouseEvent, bar: HTMLElement): void {
        if (!this.tooltipHasFocus) {
            return;
        }

        this.updatePlayerVolumeForMouseEvent(e, bar);
        this.tooltipHasFocus = false;
    }

    onInputCurrentTimePercent(percent: string) {
        let currentTimeFraction = +percent * 0.01;
        this.player.currentTime = this.player.duration * currentTimeFraction;
    }

    private updatePlayerVolumeForMouseEvent(e: MouseEvent, bar: HTMLElement): void {
        let offsetY: number = e.offsetY;

        if (e.target !== bar) {
            let diff = bar.offsetHeight - (<HTMLElement>e.target).clientHeight;
            let mouseY = bar.offsetHeight - diff - e.offsetY;
            offsetY = bar.offsetHeight - mouseY;
        }

        let volume: number = 1 - (offsetY / bar.offsetHeight);

        if (volume > 1) {
            volume = 1;
        }

        this.player.volume = volume;
    }

    private togglePlayback(): void {
        this.player.paused ? this.player.play() : this.player.pause();
    }

    private showTooltip(): void {
        this.tooltipHidden = false;

        if (this.tooltipTimeout) {
            clearTimeout(this.tooltipTimeout);
        }
    }

    private hideTooltip(): void {
        this.tooltipTimeout = setTimeout(() => this.tooltipHidden = true, 400);
    }

    private onCurrentTime(timeInSeconds: number): void {
        this.currentTimeString = this.timeFormatService.fromSeconds(timeInSeconds);
        this.currentTimePercent = (timeInSeconds / this.player.duration) * 100;
    }

    private onLoadedMetadata() {
        this.durationString = this.timeFormatService.fromSeconds(this.player.duration);
    }

    private onProgress(progress: number) {
        this.progressPercent = progress * 100;
    }
}
