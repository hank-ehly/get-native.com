/**
 * video-panel.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/30.
 */

import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

import { Video, UTCDateService, Logger } from '../../core/index';

@Component({
    moduleId: module.id,
    selector: 'gn-video-panel',
    templateUrl: 'video-panel.component.html',
    styleUrls: ['video-panel.component.css']
})
export class VideoPanelComponent implements OnChanges {
    @Input() showControls: boolean;
    @Input() video: Video;
    @Output() begin = new EventEmitter();
    @Output() clickOverlay = new EventEmitter();

    time: number = 15;
    min: number  = 4;
    max: number  = 60;

    createdAt: string = '';
    length: string    = '';

    constructor(private dateService: UTCDateService, private logger: Logger) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.logger.debug(changes);

        if (changes['video']) {
            let video: Video = changes['video'].currentValue;
            let date = this.dateService.parse(video.created_at);
            this.createdAt = `${date.getUTCDate()} ${this.dateService.getTextMonth(date)} ${date.getUTCFullYear()}`;

            let d = this.dateService.dateFromSeconds(video.length);
            this.length = `${d.getUTCMinutes()}:${this.dateService.getUTCPaddedSeconds(d)}`;
            return;
        }
    }

    onBegin(): void {
        this.begin.emit();
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
