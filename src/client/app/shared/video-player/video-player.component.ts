/**
 * video-player.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/07.
 */

import { Component, OnInit, ViewChild, AfterViewInit, trigger, animate, style, transition, Input } from '@angular/core';

import { VideoDirective } from '../video/video.directive';
import { TimeFormatService, UnitInterval, Logger } from '../../core/index';

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
    @Input() loop: boolean;
    @ViewChild(VideoDirective) player: VideoDirective;

    currentTimeString: string;
    durationString: string;
    tooltipHidden: boolean;
    controlsHidden: boolean;

    progress: UnitInterval;
    currentTime: UnitInterval;

    private tooltipTimeout: NodeJS.Timer;
    private previousVolume: UnitInterval;

    constructor(private logger: Logger, private timeFormatService: TimeFormatService) {
        this.currentTimeString = this.durationString = '0:00';
        this.progress = this.currentTime = 0;
        this.controlsHidden = false;
        this.tooltipHidden = true;
    }

    get volumeControlFillStyle(): {width: string} {
        let volumePercentString = (this.player.volume * 100) + '%';
        return {width: volumePercentString};
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
        this.hideTooltip();

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
        this.hideTooltip(400);
    }

    onInputCurrentTime(time: string) {
        this.player.currentTime = this.player.duration * +time;
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

    private hideTooltip(delay?: number): void {
        this.tooltipTimeout = setTimeout(() => this.tooltipHidden = true, delay || 0);
    }

    private onCurrentTime(timeInSeconds: number): void {
        this.currentTimeString = this.timeFormatService.fromSeconds(timeInSeconds);
        this.currentTime = (timeInSeconds / this.player.duration);
    }

    private onLoadedMetadata() {
        this.durationString = this.timeFormatService.fromSeconds(this.player.duration);
    }

    private onProgress(progress: UnitInterval) {
        this.progress = progress;
    }
}
