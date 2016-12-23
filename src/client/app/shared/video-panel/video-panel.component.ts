/**
 * video-panel.component
 * get-native.com
 *
 * Created by henryehly on 2016/11/30.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'gn-video-panel',
    templateUrl: 'video-panel.component.html',
    styleUrls: ['video-panel.component.css']
})

export class VideoPanelComponent implements OnInit {
    @Input() showControls: boolean;
    @Output() begin = new EventEmitter();

    time: number = 15;
    minTime: number = 4;
    maxTime: number = 60;

    constructor() {
    }

    ngOnInit() {
    }

    onBegin(): void {
        this.begin.emit();
    }

    onClickMinuteButtonIncrement() {
        if (this.time < this.maxTime) {
            this.time = this.time + 1;
        }
    }

    onClickMinuteButtonDecrement() {
        if (this.time > this.minTime) {
            this.time = this.time - 1;
        }
    }
}
