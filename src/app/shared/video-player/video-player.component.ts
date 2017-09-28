/**
 * video-player.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/07.
 */

import { Component, OnInit, ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { trigger, animate, style, transition } from '@angular/animations';

import { UnitInterval } from '../../core/typings/unit-interval';
import { VideoDirective } from '../video/video.directive';
import { Logger } from '../../core/logger/logger';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'gn-video-player',
    templateUrl: 'video-player.component.html',
    styleUrls: ['video-player.component.scss'],
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
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() loop: boolean;
    @Input() src: string;
    @Input() autoplay: boolean;

    @ViewChild(VideoDirective) player: VideoDirective;

    OnDestroy$: Subject<void>;
    currentTimeAsPercentEmitted$: Observable<number>;

    tooltipHidden: boolean;
    controlsHidden: boolean;

    private tooltipTimeout: NodeJS.Timer;
    private previousVolume: UnitInterval;

    constructor(private logger: Logger) {
        this.OnDestroy$ = new Subject<void>();
        this.controlsHidden = false;
        this.tooltipHidden = true;
    }

    get volumeControlFillStyle(): { width: string } {
        const volumePercentString = [this.player.volume * 100, '%'].join('');
        return {width: volumePercentString};
    }

    ngOnInit(): void {
        this.logger.info(this, 'OnInit');
    }

    ngOnDestroy(): void {
        this.logger.debug(this, 'OnDestroy');
        this.OnDestroy$.next();
    }

    ngAfterViewInit(): void {
        this.logger.debug(this, 'AfterViewInit');
        this.currentTimeAsPercentEmitted$ = this.player.currentTimeEmitted$
            .map(timeInSeconds => timeInSeconds / this.player.duration);
    }

    onClickToggleButton(): void {
        this.togglePlayback();
    }

    onMouseEnterPlayerFrame(): void {
        this.controlsHidden = false;
    }

    onContextMenu(): boolean {
        return false;
    }

    onDoubleClickVideoFrame(): void {
        this.togglePlayback();
    }

    onMouseLeavePlayerFrame(): void {
        this.hideTooltip();

        if (!this.player.paused) {
            this.controlsHidden = true;
        }
    }

    onClickVolumeControl(e: MouseEvent): void {
        const classNameArr: string[] = (<HTMLElement>e.target).className.split(' ');
        const validTargets = ['volume-control', 'volume-control__icon'];

        let found = false;
        for (const className of classNameArr) {
            if (validTargets.includes(className)) {
                found = true;
            }
        }

        if (!found) {
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
        this.logger.debug(this, 'Mouse entered volume control');
        this.showTooltip();
    }

    onMouseLeaveVolumeControl(): void {
        this.logger.debug(this, 'Mouse left volume control');
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

}
