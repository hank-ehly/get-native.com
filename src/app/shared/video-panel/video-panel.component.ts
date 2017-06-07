/**
 * video-panel.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/30.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Video } from '../../core/entities/video';
import { StudySession } from '../../core/entities/study-session';

@Component({

    selector: 'gn-video-panel',
    templateUrl: 'video-panel.component.html',
    styleUrls: ['video-panel.component.css']
})
export class VideoPanelComponent {
    @Input() controls: boolean;
    @Input() video: Video;
    @Output() begin = new EventEmitter<StudySession>();
    @Output() clickOverlay = new EventEmitter();

    time: number = 15;
    min: number  = 4;
    max: number  = 60;

    constructor() {
        this.controls = false;
    }

    onBegin(): void {
        this.begin.emit({video_id: this.video.id, study_time: this.time * 60});
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
