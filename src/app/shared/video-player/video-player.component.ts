/**
 * video-player.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/12/07.
 */

import {
    Component, OnInit, ViewChild, AfterViewInit, Input, OnDestroy, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy
} from '@angular/core';
import { trigger, animate, style, transition } from '@angular/animations';

import { YoutubePlayerDirective } from '../youtube-player.directive';
import { UnitInterval } from '../../core/typings/unit-interval';
import { Logger } from '../../core/logger/logger';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
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
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

    @Input() loop: boolean;
    @Input() youtubeVideoId: string;
    @Input() autoplay: boolean;
    @Input() width: number;
    @Input() height: number;

    @ViewChild(YoutubePlayerDirective) player: YoutubePlayerDirective;
    @ViewChild('seekInput') seekInput: HTMLInputElement;

    OnDestroy$: Subject<void>;

    tooltipHidden: boolean;
    controlsHidden: boolean;

    private tooltipTimeout: NodeJS.Timer;
    private previousVolume: UnitInterval;

    constructor(private logger: Logger, private changeDetectorRef: ChangeDetectorRef) {
        this.OnDestroy$ = new Subject<void>();
        this.controlsHidden = true;
        this.tooltipHidden = true;
    }

    get volumeControlFillStyle(): { width: string } {
        return {width: this.player.volume + '%'};
    }

    get isPaused(): boolean {
        return this.player.playerState === 2;
    }

    get showMutedIcon(): boolean {
        return this.player.muted || this.player.volume === 0;
    }

    onSeekChange(e: Event): void {
        this.player.seekTo(this.player.duration * +(<HTMLInputElement>e.target).value);
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
    }

    ngAfterViewChecked(): void {
        this.changeDetectorRef.detectChanges();
    }

    onClickToggleButton(): void {
        this.togglePlayback();
    }

    onMouseEnterPlayerFrame(): void {
        this.controlsHidden = false;
    }

    onDoubleClickVideoFrame(): void {
        this.togglePlayback();
    }

    onMouseLeavePlayerFrame(): void {
        this.hideTooltip();

        if (!this.isPaused) {
            this.controlsHidden = true;
        }
    }

    onInputVolume(e: Event): void {
        this.player.volume = +(<HTMLInputElement>e.target).value;
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
            this.player.volume = 100;
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

    private togglePlayback(): void {
        if (this.player.api.getPlayerState() === 1) {
            this.player.api.pauseVideo();
        } else {
            this.player.api.playVideo();
        }
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
