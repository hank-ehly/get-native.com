/**
 * video-panel.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/30.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Video } from '../../core/entities/video';

@Component({
    moduleId: module.id,
    selector: 'gn-video-panel',
    templateUrl: 'video-panel.component.html',
    styleUrls: ['video-panel.component.css']
})
export class VideoPanelComponent {
    @Input() controls: boolean;
    @Input() video: Video;
    @Output() begin = new EventEmitter<{ videoId: number, studyTime: number }>();
    @Output() clickOverlay = new EventEmitter();

    time: number = 15;
    min: number  = 4;
    max: number  = 60;

    constructor() {
        this.controls = false;
    }

    onBegin(): void {
        this.begin.emit({videoId: this.video.id, studyTime: this.time * 60});
    }

    onClickMinuteButtonIncrement(): void {
        if (this.time < this.max) {
            this.time = this.time + 1;
        }
    }

    onClickMinuteButtonDecrement(): void {
        if (this.time > this.min) {
            this.time = this.time - 1;
        }
    }

    onClickOverlay(): void {
        this.clickOverlay.emit();
    }
}
