/**
 * video-player.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/07.
 */

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { VideoDirective } from '../video/video.directive';
import { TimeFormatService } from '../../core/index';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-video-player',
    templateUrl: 'video-player.component.html',
    styleUrls: ['video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
    @ViewChild(VideoDirective) video: VideoDirective;

    currentTime: string;
    duration: string;
    loaded: number;
    progress: number;

    constructor(private logger: Logger, private timeFormatService: TimeFormatService) {
        this.currentTime = this.duration = '0:00';
        this.loaded = 0;
    }

    ngOnInit(): void {
        this.logger.info(`[${this.constructor.name}] ngOnInit()`);
    }

    ngAfterViewInit(): void {
        this.video.currentTime$.subscribe(t => {
            this.currentTime = this.timeFormatService.fromSeconds(t);
            this.progress = (t / this.video.duration) * 100;
        });

        this.video.metadata$.subscribe(() => this.duration = this.timeFormatService.fromSeconds(this.video.duration));
        this.video.load$.subscribe(v => this.loaded = v * 100);
    }

    onTogglePlay(): void {
        this.video.paused ? this.video.play() : this.video.pause();
    }
}
