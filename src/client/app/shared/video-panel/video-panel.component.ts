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
    @Input() showOverlay: boolean;
    @Output() begin = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onBegin(): void {
        this.begin.emit();
    }
}
