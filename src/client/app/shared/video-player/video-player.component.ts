/**
 * video-player.component
 * get-native.com
 *
 * Created by henryehly on 2016/12/07.
 */

import { Component, OnInit, ViewChild } from '@angular/core';

import { VideoDirective } from '../video/video.directive';

import { Logger } from 'angular2-logger/core';

@Component({
    moduleId: module.id,
    selector: 'gn-video-player',
    templateUrl: 'video-player.component.html',
    styleUrls: ['video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
    @ViewChild(VideoDirective) video: VideoDirective;

    constructor(private logger: Logger) {
    }

    ngOnInit() {
        this.logger.info('[VideoPlayerComponent] ngOnInit()');
    }

    onTogglePlayback(): void {
        this.video.paused ? this.video.play() : this.video.pause();
    }
}
