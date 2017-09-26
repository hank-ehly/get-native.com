/**
 * video-panel.component
 * getnativelearning.com
 *
 * Created by henryehly on 2016/11/30.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Video } from '../../core/entities/video';
import { StudySession } from '../../core/entities/study-session';

@Component({
    selector: 'gn-video-panel',
    templateUrl: 'video-panel.component.html',
    styleUrls: ['video-panel.component.scss']
})
export class VideoPanelComponent {

    @Input() controls = false;
    @Input() video: Video;
    @Input() disabled = false;
    @Output() begin = new EventEmitter<StudySession>();
    @Output() clickOverlay = new EventEmitter();

    time = 10;
    min = 4;
    max = 60;
    isBeginTarget = false;

    onBegin(): void {
        this.begin.emit({video_id: this.video.id, study_time: this.time * 60});
        this.isBeginTarget = true;
    }

    onClickMinuteButtonIncrement(): void {
        if (!this.disabled && this.time < this.max) {
            this.time = this.time + 1;
        }
    }

    onClickMinuteButtonDecrement(): void {
        if (!this.disabled && this.time > this.min) {
            this.time = this.time - 1;
        }
    }

    onClickOverlay(): void {
        if (!this.disabled) {
            this.clickOverlay.emit();
        }
    }

}
